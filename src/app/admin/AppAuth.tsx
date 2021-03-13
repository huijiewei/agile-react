import { ReactNode, useCallback } from 'react';
import { AuthLoginProvider } from '@shared/contexts/AuthLoginContext';

const AppAuthProvider = ({ children }: { children: ReactNode }) => {
  return <AuthLoginProvider>{children}</AuthLoginProvider>;
};

const ClientIdKey = 'ag:admin-client-id';
const AccessTokenKey = 'ag:admin-access-token';

type UseAuthTokenReturnType = {
  getAuthToken: () => { clientId: string; accessToken: string };
  setAccessToken: (accessToken: string) => void;
};

const useAuthToken = (): UseAuthTokenReturnType => {
  const getAuthToken = useCallback(() => {
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
  }, []);

  const setAccessToken = useCallback((accessToken) => {
    window.localStorage.setItem(AccessTokenKey, accessToken);
  }, []);

  return {
    getAuthToken,
    setAccessToken,
  };
};

export { AppAuthProvider, useAuthToken };
