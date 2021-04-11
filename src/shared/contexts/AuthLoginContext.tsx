import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

export enum AuthLoginAction {
  NONE,
  MODAL,
  DIRECT,
}

type IAuthLoginDispatch = {
  setLoginAction: (action: AuthLoginAction) => void;
  resetLoginAction: () => void;
};

type AuthLoginDispatchContextType = Dispatch<SetStateAction<AuthLoginAction>>;

const AuthLoginStateContext = createContext<AuthLoginAction | undefined>(undefined);

const AuthLoginDispatchContext = createContext<AuthLoginDispatchContextType | undefined>(undefined);

const AuthLoginProvider = ({ children }: { children: ReactNode }) => {
  const [authLoginState, setAuthLoginState] = useState<AuthLoginAction>(AuthLoginAction.NONE);

  return (
    <AuthLoginDispatchContext.Provider value={setAuthLoginState}>
      <AuthLoginStateContext.Provider value={authLoginState}>{children}</AuthLoginStateContext.Provider>
    </AuthLoginDispatchContext.Provider>
  );
};

const useAuthLoginState = (): AuthLoginAction => {
  const authLoginState = useContext(AuthLoginStateContext);

  if (authLoginState === undefined) {
    throw new Error('useAuthLoginState must be used within a AuthLoginProvider');
  }

  return authLoginState;
};

const useAuthLoginDispatch = (): IAuthLoginDispatch => {
  const authLoginDispatch = useContext(AuthLoginDispatchContext);

  if (authLoginDispatch === undefined) {
    throw new Error('useAuthLoginDispatch must be used within a AuthLoginProvider');
  }

  const setLoginAction = (action: AuthLoginAction) => {
    authLoginDispatch(action);
  };

  const resetLoginAction = () => {
    authLoginDispatch(AuthLoginAction.NONE);
  };

  return { setLoginAction, resetLoginAction };
};

export { AuthLoginProvider, useAuthLoginState, useAuthLoginDispatch };
