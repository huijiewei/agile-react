import { createContext, FC, useCallback, useContext, useState } from 'react';

export enum LoginAction {
  NONE,
  MODAL,
  DIRECT,
}

interface IAuthLoginSetDispatch {
  (action: LoginAction): void;
}

const AuthLoginStateContext = createContext<LoginAction | undefined>(undefined);

const AuthLoginSetDispatchContext = createContext<IAuthLoginSetDispatch | undefined>(undefined);

const AuthLoginProvider: FC = ({ children }) => {
  const [authLoginState, setAuthLoginState] = useState<LoginAction>(LoginAction.NONE);

  const setAuthLogin = useCallback((action) => {
    setAuthLoginState(action);
  }, []);

  return (
    <AuthLoginSetDispatchContext.Provider value={setAuthLogin}>
      <AuthLoginStateContext.Provider value={authLoginState}>{children}</AuthLoginStateContext.Provider>
    </AuthLoginSetDispatchContext.Provider>
  );
};

const useAuthLoginState = (): LoginAction => {
  const context = useContext(AuthLoginStateContext);

  if (context === undefined) {
    throw new Error('useAuthLoginState must be used within a AuthLoginProvider');
  }

  return context;
};

const useAuthLoginSetDispatch = (): IAuthLoginSetDispatch => {
  const context = useContext(AuthLoginSetDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthLoginSetDispatch must be used within a AuthLoginProvider');
  }

  return context;
};

export { AuthLoginProvider, useAuthLoginState, useAuthLoginSetDispatch };
