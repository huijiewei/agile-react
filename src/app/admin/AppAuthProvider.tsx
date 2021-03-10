import { FC } from 'react';
import { AuthTokenProvider } from '@shared/contexts/AuthTokenContext';
import { AuthLoginProvider } from '@shared/contexts/AuthLoginContext';
import { AuthUserProvider } from '@admin/contexts/AuthUserContext';
import { useLocalStorage } from '@shared/hooks/useLocalStorage';

const clientIdKey = 'ag:admin-client-id';
const accessTokenKey = 'ag:admin-access-token';

const AppAuthProvider: FC = ({ children }) => {
  const [clientId] = useLocalStorage(clientIdKey, Math.random().toString(36).substr(2));
  const [accessToken, setAccessToken] = useLocalStorage(accessTokenKey, '');

  return (
    <AuthTokenProvider
      getClientId={() => clientId}
      getAccessToken={() => accessToken}
      setAccessToken={(accessToken) => setAccessToken(accessToken)}
    >
      <AuthLoginProvider>
        <AuthUserProvider>{children}</AuthUserProvider>
      </AuthLoginProvider>
    </AuthTokenProvider>
  );
};

export { AppAuthProvider };
