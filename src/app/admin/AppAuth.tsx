import { ReactNode } from 'react';
import { AuthLoginProvider } from '@shared/contexts/AuthLoginContext';

const ClientIdKey = 'ag:admin-client-id';
const AccessTokenKey = 'ag:admin-access-token';

const AppAuthProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return <AuthLoginProvider>{children}</AuthLoginProvider>;
};

type AuthToken = {
  clientId: string;
  accessToken: string;
};

const getAuthToken = (): AuthToken => {
  let clientId = window.localStorage.getItem(ClientIdKey);

  if (clientId == null) {
    clientId = Math.random().toString(36).substr(2);
    window.localStorage.setItem(ClientIdKey, clientId);
  }

  const accessToken = window.localStorage.getItem(AccessTokenKey) || '';

  return {
    clientId,
    accessToken,
  };
};

const setAuthAccessToken = (accessToken: string): void => {
  window.localStorage.setItem(AccessTokenKey, accessToken);
};

export { AppAuthProvider, getAuthToken, setAuthAccessToken };
