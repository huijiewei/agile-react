import { StrictMode } from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from './App';

import './serviceWorker';

import ErrorProvider from '@shared/contexts/ErrorContext';
import ErrorDialog from '@admin/components/ErrorDialog';
import AuthProvider from '@shared/contexts/AuthContext';

const clientIdKey = 'ag:admin-client-id';
const accessTokenKey = 'ag:admin-access-token';

if (window.localStorage.getItem(clientIdKey) == null) {
  window.localStorage.setItem(clientIdKey, Math.random().toString(36).substr(2));
}

render(
  <StrictMode>
    <ErrorProvider>
      <AuthProvider
        getClientId={() => window.localStorage.getItem(clientIdKey)}
        getAccessToken={() => window.localStorage.getItem(accessTokenKey) ?? ''}
        setAccessToken={(accessToken) => window.localStorage.setItem(accessTokenKey, accessToken)}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
      <ErrorDialog />
    </ErrorProvider>
  </StrictMode>,
  document.getElementById('root'),
);
