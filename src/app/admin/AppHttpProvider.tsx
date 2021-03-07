import { FC } from 'react';
import { useAuthTokenState } from '@shared/contexts/AuthTokenContext';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { AuthLoginAction, useAuthLoginDispatch } from '@shared/contexts/AuthLoginContext';
import queryString from 'query-string';
import { AxiosProvider } from '@shared/contexts/AxiosContext';
import { SWRConfig } from 'swr';

const UnauthorizedHttpCode = 401;
const UnprocessableEntityHttpCode = 422;

const HttpGetMethod = ['GET', 'HEAD'];

const AppAxiosProvider: FC = ({ children }) => {
  const authToken = useAuthTokenState();
  const { setError } = useErrorDispatch();
  const { setLoginAction } = useAuthLoginDispatch();

  return (
    <AxiosProvider
      baseUrl={document.querySelector('meta[name="api-host"]').getAttribute('content')}
      onRequest={(config) => {
        config.headers['X-Client-Id'] = authToken.clientId;
        config.headers['X-Access-Token'] = authToken.accessToken;

        return config;
      }}
      onSuccess={(response) => {
        if (response.config.responseType === 'blob') {
          return Promise.resolve(response);
        }

        return Promise.resolve(response.data);
      }}
      onError={(error) => {
        const historyBack = error.config['__historyBack'];

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
      }}
      paramsSerializer={(params) => {
        return queryString.stringify(params, {
          arrayFormat:
            (process.env.QS_ARRAY_FORMAT as 'bracket' | 'index' | 'comma' | 'separator' | 'none') || 'bracket',
        });
      }}
    >
      {children}
    </AxiosProvider>
  );
};

const AppHttpProvider: FC = ({ children }) => {
  return (
    <AppAxiosProvider>
      <SWRConfig
        value={{
          revalidateOnFocus: false,
          shouldRetryOnError: false,
        }}
      >
        {children}
      </SWRConfig>
    </AppAxiosProvider>
  );
};

export { AppHttpProvider };
