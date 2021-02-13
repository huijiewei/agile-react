import { useRoutes } from 'react-router-dom';

import useSplash from '@shared/hooks/useSplash';

import queryString from 'query-string';

import '@admin/assets/styles/admin.base.css';
import '@admin/assets/styles/admin.components.css';
import '@admin/assets/styles/admin.utilities.css';

import routes from '@admin/routers';
import { FC } from 'react';
import HttpProvider from '@shared/contexts/HttpContext';

const App: FC = () => {
  useSplash();

  return (
    <HttpProvider
      value={{
        url: document.querySelector('meta[name="api-host"]').getAttribute('content'),
        onError: (error) => {
          console.log(error);

          return Promise.reject(error);
        },
        onRequest: (config) => {
          const accessToken = {
            clientId: 'CD',
            accessToken: 'AT',
          };

          if (accessToken) {
            config.headers['X-Client-Id'] = accessToken.clientId;
            config.headers['X-Access-Token'] = accessToken.accessToken;
          }

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
