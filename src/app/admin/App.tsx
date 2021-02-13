import { Navigate, useRoutes } from 'react-router-dom';

import useSplash from '@shared/hooks/useSplash';

import queryString from 'query-string';

import '@admin/assets/styles/admin.base.css';
import '@admin/assets/styles/admin.components.css';
import '@admin/assets/styles/admin.utilities.css';

import routes from '@admin/routers';
import { FC } from 'react';
import HttpProvider from '@shared/contexts/HttpContext';
import useAuth from '@shared/hooks/useAuth';
import useError from '@shared/hooks/useError';
import { LoginAction } from '@shared/contexts/AuthContext';

const UnauthorizedHttpCode = 401;
const UnprocessableEntityHttpCode = 422;

const HttpGetMethod = ['GET', 'HEAD'];

const App: FC = () => {
  useSplash();

  const { authToken, setLoginAction } = useAuth();
  const { addError } = useError();

  return (
    <HttpProvider
      value={{
        url: document.querySelector('meta[name="api-host"]').getAttribute('content'),
        onError: (error) => {
          console.log(error);
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
                // setLoginAction(LoginAction.DIRECT);
              } else {
                // 弹出登录框
                setLoginAction(LoginAction.MODAL);
              }
            }

            return Promise.reject(error);
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
      {useRoutes(routes, process.env.PUBLIC_URL)}
    </HttpProvider>
  );
};

export default App;
