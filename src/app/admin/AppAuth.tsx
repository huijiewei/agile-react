import { ReactNode } from 'react';
import { AuthLoginProvider } from '@shared/contexts/AuthLoginContext';

const ClientIdKey = 'ag:admin-client-id';
const AccessTokenKey = 'ag:admin-access-token';

export const AppAuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthLoginProvider>{children}</AuthLoginProvider>;
};

interface AuthToken {
  clientId: string;
  accessToken: string;
}

export const getAuthToken = (): AuthToken => {
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

export const setAuthAccessToken = (accessToken: string) => {
  window.localStorage.setItem(AccessTokenKey, accessToken);
};
