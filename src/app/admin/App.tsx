import { FC } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import queryString from 'query-string';

import useSplash from '@shared/hooks/useSplash';

import ErrorProvider from '@shared/contexts/ErrorContext';
import ErrorDialog from '@admin/components/ErrorDialog';

import HttpProvider from '@shared/contexts/HttpContext';

import '@admin/assets/styles/admin.base.css';
import '@admin/assets/styles/admin.components.css';
import '@admin/assets/styles/admin.utilities.css';

import { useErrorDispatcher } from '@shared/hooks/useError';

import routes from '@admin/routers';

const UnauthorizedHttpCode = 401;
const UnprocessableEntityHttpCode = 422;

const HttpGetMethod = ['GET', 'HEAD'];

const AppErrorProvider: FC = ({ children }) => {
  return (
    <ErrorProvider>
      {children}
      <ErrorDialog />
    </ErrorProvider>
  );
};

const AppRouterProvider: FC = ({ children }) => {
  return <BrowserRouter>{children}</BrowserRouter>;
};

const AppHttpProvider: FC = ({ children }) => {
  const { addError } = useErrorDispatcher();

  return (
    <HttpProvider
      value={{
        url: document.querySelector('meta[name="api-host"]').getAttribute('content'),
        onError: (error) => {
          const historyBack = error.config.historyBack;

          if (!error.response) {
            addError(error.message, historyBack);

            return Promise.reject(error);
          }

          if (error.response.status === UnauthorizedHttpCode) {
            if (!error.config.__storeDispatch) {
              error.config.__storeDispatch = true;

              if (historyBack || HttpGetMethod.includes(error.config.method.toUpperCase())) {
                // 跳转登录
                //setLoginAction(LoginAction.DIRECT);
              } else {
                // 弹出登录框
                //setLoginAction(LoginAction.MODAL);
              }
            }

            return null;
          }

          if (error.response.status === UnprocessableEntityHttpCode) {
            return Promise.reject(error);
          }

          addError(
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
          config.headers['X-Client-Id'] = '';
          config.headers['X-Access-Token'] = '';

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

const AppRoutes: FC = () => {
  return useRoutes(routes, process.env.PUBLIC_URL);
};

const App: FC = () => {
  console.log('App render');

  useSplash();
  return (
    <AppErrorProvider>
      <AppRouterProvider>
        <AppHttpProvider>
          <AppRoutes />
        </AppHttpProvider>
      </AppRouterProvider>
    </AppErrorProvider>
  );
};

export default App;
