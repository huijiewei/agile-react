import { createContext, FC, useCallback, useContext, useState } from 'react';

interface IAuthTokenState {
  clientId: string;
  accessToken: string;
}

interface IAuthTokenSetDispatch {
  (accessToken: string): void;
}

const AuthTokenStateContext = createContext<IAuthTokenState | undefined>(undefined);
const AuthTokenSetDispatchContext = createContext<IAuthTokenSetDispatch | undefined>(undefined);

interface AuthTokenProviderProps {
  getClientId: () => string;
  getAccessToken: () => string;
  setAccessToken: (accessToken: string) => void;
}

const AuthTokenProvider: FC<AuthTokenProviderProps> = ({ children, getClientId, getAccessToken, setAccessToken }) => {
  const [authTokenState] = useState<IAuthTokenState>(() => {
    return { clientId: getClientId(), accessToken: getAccessToken() };
  });

  return (
    <AuthTokenSetDispatchContext.Provider value={setAccessToken}>
      <AuthTokenStateContext.Provider value={authTokenState}>{children}</AuthTokenStateContext.Provider>
    </AuthTokenSetDispatchContext.Provider>
  );
};

const useAuthTokenState = (): IAuthTokenState => {
  const context = useContext(AuthTokenStateContext);

  if (context === undefined) {
    throw new Error('useAuthTokenState must be used within a AuthTokenProvider');
  }

  return context;
};

const useAuthTokenSetDispatch = (): IAuthTokenSetDispatch => {
  const context = useContext(AuthTokenSetDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthTokenSetDispatch must be used within a AuthTokenProvider');
  }

  return context;
};

export { AuthTokenProvider, useAuthTokenState, useAuthTokenSetDispatch };
