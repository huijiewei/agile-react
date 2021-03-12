import { createContext, useContext, useMemo, useState } from 'react';

export enum AuthLoginAction {
  NONE,
  MODAL,
  DIRECT,
}

interface IAuthLoginDispatch {
  setLoginAction: (action: AuthLoginAction) => void;
  resetLoginAction: () => void;
}

const AuthLoginStateContext = createContext<AuthLoginAction | undefined>(undefined);

const AuthLoginDispatchContext = createContext<IAuthLoginDispatch | undefined>(undefined);

const AuthLoginProvider = ({ children }) => {
  const [authLoginState, setAuthLoginState] = useState<AuthLoginAction>(AuthLoginAction.NONE);

  const authLoginDispatch = useMemo(() => {
    return {
      setLoginAction: (action) => {
        setAuthLoginState(action);
      },
      resetLoginAction: () => {
        setAuthLoginState(AuthLoginAction.NONE);
      },
    };
  }, []);

  return (
    <AuthLoginDispatchContext.Provider value={authLoginDispatch}>
      <AuthLoginStateContext.Provider value={authLoginState}>{children}</AuthLoginStateContext.Provider>
    </AuthLoginDispatchContext.Provider>
  );
};

const useAuthLoginState = (): AuthLoginAction => {
  const context = useContext(AuthLoginStateContext);

  if (context === undefined) {
    throw new Error('useAuthLoginState must be used within a AuthLoginProvider');
  }

  return context;
};

const useAuthLoginDispatch = (): IAuthLoginDispatch => {
  const context = useContext(AuthLoginDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthLoginDispatch must be used within a AuthLoginProvider');
  }

  return context;
};

export { AuthLoginProvider, useAuthLoginState, useAuthLoginDispatch };
