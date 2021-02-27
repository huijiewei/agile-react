import { createContext, FC, useContext, useMemo, useState } from 'react';

interface IAuthTokenState {
  clientId: string;
  accessToken: string;
}

interface IAuthTokenDispatch {
  setAccessToken: (accessToken: string) => void;
  resetAccessToken: () => void;
}

const AuthTokenStateContext = createContext<IAuthTokenState | undefined>(undefined);
const AuthTokenDispatchContext = createContext<IAuthTokenDispatch | undefined>(undefined);

interface AuthTokenProviderProps {
  getClientId: () => string;
  getAccessToken: () => string;
  setAccessToken: (accessToken: string) => void;
}

const AuthTokenProvider: FC<AuthTokenProviderProps> = ({ children, getClientId, getAccessToken, setAccessToken }) => {
  const [authTokenState] = useState<IAuthTokenState>(() => {
    return { clientId: getClientId(), accessToken: getAccessToken() };
  });

  const authTokenDispatch = useMemo(() => {
    return {
      setAccessToken: (accessToken) => {
        setAccessToken(accessToken);
      },
      resetAccessToken: () => {
        setAccessToken('');
      },
    };
  }, []);

  return (
    <AuthTokenDispatchContext.Provider value={authTokenDispatch}>
      <AuthTokenStateContext.Provider value={authTokenState}>{children}</AuthTokenStateContext.Provider>
    </AuthTokenDispatchContext.Provider>
  );
};

const useAuthTokenState = (): IAuthTokenState => {
  const context = useContext(AuthTokenStateContext);

  if (context === undefined) {
    throw new Error('useAuthTokenState must be used within a AuthTokenProvider');
  }

  return context;
};

const useAuthTokenDispatch = (): IAuthTokenDispatch => {
  const context = useContext(AuthTokenDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthTokenDispatch must be used within a AuthTokenProvider');
  }

  return context;
};

export { AuthTokenProvider, useAuthTokenState, useAuthTokenDispatch };
