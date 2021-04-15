import { ReactNode } from 'react';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { AuthLoginAction, useAuthLoginDispatch } from '@shared/contexts/AuthLoginContext';
import queryString from 'query-string';
import { HttpProvider } from '@shared/contexts/HttpContext';
import { SWRConfig } from 'swr';
import { getAuthToken } from '@admin/AppAuth';
import {
  HttpError,
  HttpGetMethod,
  HttpParams,
  HttpRequestConfig,
  HttpResponse,
  UnauthorizedHttpCode,
  UnprocessableEntityHttpCode,
} from '@shared/utils/http';

const AppHttpProvider = ({ children }: { children: ReactNode }) => {
  const { setError } = useErrorDispatch();
  const { setLoginAction } = useAuthLoginDispatch();

  const onRequest = (config: HttpRequestConfig) => {
    const authToken = getAuthToken();

    config.headers['X-Client-Id'] = authToken.clientId;
    config.headers['X-Access-Token'] = authToken.accessToken;

    return config;
  };

  const onError = (error: HttpError) => {
    const historyBack = Boolean(error.config['__historyBack']);

    if (!error.response) {
      setError(error.message, historyBack);

      return Promise.reject(error);
    }

    if (error.response.status === UnauthorizedHttpCode) {
      if (!error.config['__storeDispatch']) {
        error.config['__storeDispatch'] = true;

        if (historyBack || HttpGetMethod.includes(error.config.method?.toUpperCase() as string)) {
          // 跳转登录
          setLoginAction(AuthLoginAction.DIRECT);
        } else {
          // 弹出登录框
          setLoginAction(AuthLoginAction.MODAL);
        }
      }

      return null;
    }

    if (error.response.status === UnprocessableEntityHttpCode) {
      return Promise.reject(error);
    }

    setError(
      error.response.data.detail ||
        error.response.data.message ||
        error.response.data.title ||
        error.response.statusText ||
        '网络请求错误',
      historyBack
    );

    return Promise.reject(error);
  };

  const paramsSerializer = (params: HttpParams) => {
    if (params) {
      return queryString.stringify(params, {
        arrayFormat: (process.env.QS_ARRAY_FORMAT as 'bracket' | 'index' | 'comma' | 'separator' | 'none') || 'bracket',
        skipNull: true,
      });
    }

    return '';
  };

  const onSuccess = (response: HttpResponse) => {
    if (response.config.responseType === 'blob') {
      return Promise.resolve(response);
    }

    return Promise.resolve(response.data);
  };

  return (
    <HttpProvider
      baseUrl={document.querySelector('meta[name="api-host"]')?.getAttribute('content')}
      onRequest={onRequest}
      onSuccess={onSuccess}
      onError={onError}
      paramsSerializer={paramsSerializer}
    >
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        {children}
      </SWRConfig>
    </HttpProvider>
  );
};

export { AppHttpProvider };
