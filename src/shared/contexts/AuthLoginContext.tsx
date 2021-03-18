import { createContext, Dispatch, ReactNode, SetStateAction, useCallback, useContext, useState } from 'react';

export enum AuthLoginAction {
  NONE,
  MODAL,
  DIRECT,
}

interface IAuthLoginDispatch {
  setLoginAction: (action: AuthLoginAction) => void;
  resetLoginAction: () => void;
}

type AuthLoginDispatchContextType = Dispatch<SetStateAction<AuthLoginAction>>;

const AuthLoginStateContext = createContext<AuthLoginAction | undefined>(undefined);

const AuthLoginDispatchContext = createContext<AuthLoginDispatchContextType | undefined>(undefined);

export const AuthLoginProvider = ({ children }: { children: ReactNode }) => {
  const [authLoginState, setAuthLoginState] = useState<AuthLoginAction>(AuthLoginAction.NONE);

  return (
    <AuthLoginDispatchContext.Provider value={setAuthLoginState}>
      <AuthLoginStateContext.Provider value={authLoginState}>{children}</AuthLoginStateContext.Provider>
    </AuthLoginDispatchContext.Provider>
  );
};

export const useAuthLoginState = (): AuthLoginAction => {
  const authLoginState = useContext(AuthLoginStateContext);

  if (authLoginState === undefined) {
    throw new Error('useAuthLoginState must be used within a AuthLoginProvider');
  }

  return authLoginState;
};

export const useAuthLoginDispatch = (): IAuthLoginDispatch => {
  const authLoginDispatch = useContext(AuthLoginDispatchContext);

  if (authLoginDispatch === undefined) {
    throw new Error('useAuthLoginDispatch must be used within a AuthLoginProvider');
  }

  const setLoginAction = useCallback(
    (action: AuthLoginAction) => {
      authLoginDispatch(action);
    },
    [authLoginDispatch]
  );

  const resetLoginAction = useCallback(() => {
    authLoginDispatch(AuthLoginAction.NONE);
  }, [authLoginDispatch]);

  return { setLoginAction, resetLoginAction };
};
