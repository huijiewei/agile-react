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
  authToken: IAuthTokenState;
  setAccessToken: (accessToken: string) => void;
}

const AuthTokenProvider: FC<AuthTokenProviderProps> = ({ children, authToken, setAccessToken }) => {
  console.log('AuthTokenProvider render');

  const authTokenDispatch = useMemo(() => {
    return {
      setAccessToken: (accessToken) => {
        setAccessToken(accessToken);
      },
      resetAccessToken: () => {
        setAccessToken('');
      },
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthTokenDispatchContext.Provider value={authTokenDispatch}>
      <AuthTokenStateContext.Provider value={authToken}>{children}</AuthTokenStateContext.Provider>
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
