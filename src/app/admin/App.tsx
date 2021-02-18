import { FC } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import queryString from 'query-string';

import useSplash from '@shared/hooks/useSplash';

import { ErrorProvider, useErrorSetDispatch } from '@shared/contexts/ErrorContext';
import ErrorDialog from '@admin/components/ErrorDialog';

import { HttpProvider } from '@shared/contexts/HttpContext';

import routes from '@admin/routers';
import { AuthTokenProvider, useAuthTokenState } from '@shared/contexts/AuthTokenContext';
import { AuthLoginProvider, LoginAction, useAuthLoginSetDispatch } from '@shared/contexts/AuthLoginContext';

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
            historyBack,
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

const clientIdKey = 'ag:admin-client-id';
const accessTokenKey = 'ag:admin-access-token';

if (window.localStorage.getItem(clientIdKey) == null) {
  window.localStorage.setItem(clientIdKey, Math.random().toString(36).substr(2));
}

const AppAuthProvider: FC = ({ children }) => {
  return (
    <AuthTokenProvider
      getClientId={() => window.localStorage.getItem(clientIdKey)}
      getAccessToken={() => window.localStorage.getItem(accessTokenKey) ?? ''}
      setAccessToken={(accessToken) => window.localStorage.setItem(accessTokenKey, accessToken)}
    >
      <AuthLoginProvider>
        <AuthIdentProvider>{children}</AuthIdentProvider>
      </AuthLoginProvider>
    </AuthTokenProvider>
  );
};

const AppRoutes: FC = () => {
  return useRoutes(routes, process.env.PUBLIC_URL);
};

import '@admin/assets/styles/admin.base.css';
import '@admin/assets/styles/admin.components.css';
import '@admin/assets/styles/admin.utilities.css';
import { AuthIdentProvider } from '@shared/contexts/AuthIdentContext';

const App: FC = () => {
  useSplash();

  return (
    <BrowserRouter>
      <ErrorProvider>
        <AppAuthProvider>
          <AppHttpProvider>
            <AppRoutes />
          </AppHttpProvider>
        </AppAuthProvider>
        <ErrorDialog />
      </ErrorProvider>
    </BrowserRouter>
  );
};

export default App;
