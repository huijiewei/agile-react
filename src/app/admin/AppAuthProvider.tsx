import { FC } from 'react';
import { AuthTokenProvider } from '@shared/contexts/AuthTokenContext';
import { AuthLoginProvider } from '@shared/contexts/AuthLoginContext';
import { AuthUserProvider } from '@admin/contexts/AuthUserContext';

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
        <AuthUserProvider>{children}</AuthUserProvider>
      </AuthLoginProvider>
    </AuthTokenProvider>
  );
};

export { AppAuthProvider };
