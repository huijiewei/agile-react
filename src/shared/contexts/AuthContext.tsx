import React, { createContext, useState, ReactNode, FC, PropsWithChildren } from 'react';

export interface IMenu {
  label: string;
  url: string;
  open: boolean;
  icon: string;
  children: IMenu[] | null;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
  createdAt: string;
  adminGroupId: number;
  adminGroup: {
    id: number;
    name: string;
  };
}

export interface IAuthUser {
  user: IUser | null;
  menus: IMenu[];
  permissions: string[];
}

interface IAuthToken {
  clientId: string;
  accessToken: string;
}

export enum LoginAction {
  NONE,
  MODAL,
  DIRECT,
}

export interface IAuthContext {
  authUser: IAuthUser;
  authToken: IAuthToken;
  setAuthUser: (user: IUser | null, menus: IMenu[], permissions: string[]) => void;
  setAccessToken: (accessToken: string) => void;
  loginAction: LoginAction;
  setLoginAction: (action: LoginAction) => void;
}

export const AuthContext = createContext<IAuthContext>({
  authUser: { user: null, menus: [], permissions: [] },
  authToken: { clientId: '', accessToken: '' },
  setAuthUser: () => void {},
  setAccessToken: () => void {},
  loginAction: LoginAction.NONE,
  setLoginAction: () => void {},
});

interface AuthProviderProps {
  getClientId: () => string;
  getAccessToken: () => string;
  setAccessToken: (accessToken: string) => void;
}

const AuthProvider: FC<PropsWithChildren<AuthProviderProps>> = ({
  getClientId,
  getAccessToken,
  setAccessToken,
  children,
}: PropsWithChildren<AuthProviderProps>) => {
  const [authUser, setAuthUser] = useState<IAuthUser>({ user: null, menus: [], permissions: [] });
  const [authToken] = useState<IAuthToken>(() => {
    return { clientId: getClientId(), accessToken: getAccessToken() };
  });

  const [loginAction, setLoginAction] = useState<LoginAction>(LoginAction.NONE);

  return (
    <AuthContext.Provider
      value={{
        authUser,
        authToken,
        loginAction,
        setAuthUser: (user, menus, permissions) => setAuthUser({ user, menus, permissions }),
        setAccessToken: (accessToken) => setAccessToken(accessToken),
        setLoginAction: (action) => setLoginAction(action),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
