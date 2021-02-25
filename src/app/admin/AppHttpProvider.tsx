import { FC } from 'react';
import { useAuthTokenState } from '@shared/contexts/AuthTokenContext';
import { useErrorSetDispatch } from '@shared/contexts/ErrorContext';
import { LoginAction, useAuthLoginSetDispatch } from '@shared/contexts/AuthLoginContext';
import { HttpProvider } from '@shared/contexts/HttpContext';
import queryString from 'query-string';

const UnauthorizedHttpCode = 401;
const UnprocessableEntityHttpCode = 422;

const HttpGetMethod = ['GET', 'HEAD'];

const AppHttpProvider: FC = ({ children }) => {
  const authToken = useAuthTokenState();
  const setError = useErrorSetDispatch();
  const setLoginAction = useAuthLoginSetDispatch();

  return (
    <HttpProvider
      value={{
        url: document.querySelector('meta[name="api-host"]').getAttribute('content'),
        onError: (error) => {
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
                setLoginAction(LoginAction.DIRECT);
              } else {
                // 弹出登录框
                setLoginAction(LoginAction.MODAL);
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
        },
        onRequest: (config) => {
          config.headers['X-Client-Id'] = authToken.clientId;
          config.headers['X-Access-Token'] = authToken.accessToken;

          return config;
        },
        paramsSerializer: (params) => {
          return queryString.stringify(params, {
            arrayFormat:
              (process.env['QS_ARRAY_FORMAT'] as 'bracket' | 'index' | 'comma' | 'separator' | 'none') || 'bracket',
          });
        },
      }}
    >
      {children}
    </HttpProvider>
  );
};

export { AppHttpProvider };
