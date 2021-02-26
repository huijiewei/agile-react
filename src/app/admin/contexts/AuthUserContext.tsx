import { createContext, FC, useCallback, useContext, useState } from 'react';

export interface IAccount {
  currentUser: IUser;
  groupMenus: IMenu[];
  groupPermissions: string[];
}

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

interface IAuthUserState {
  user: IUser | null;
  menus: IMenu[];
  permissions: string[];
}

interface IAuthUserSetDispatch {
  (user: IUser | null, menus?: IMenu[], permissions?: string[]): void;
}

const AuthUserStateContext = createContext<IAuthUserState | undefined>(undefined);
const AuthUserSetDispatchContext = createContext<IAuthUserSetDispatch | undefined>(undefined);

const AuthUserProvider: FC = ({ children }) => {
  const [authUserState, setAuthUserState] = useState<IAuthUserState>({
    user: null,
    menus: [],
    permissions: [],
  });

  const setAuthUser = useCallback((user, menus = [], permissions = []) => {
    setAuthUserState({ user, menus, permissions });
  }, []);
  return (
    <AuthUserSetDispatchContext.Provider value={setAuthUser}>
      <AuthUserStateContext.Provider value={authUserState}>{children}</AuthUserStateContext.Provider>
    </AuthUserSetDispatchContext.Provider>
  );
};

const useAuthUserState = (): IAuthUserState => {
  const context = useContext(AuthUserStateContext);

  if (context === undefined) {
    throw new Error('useAuthUserState must be used within a AuthUserProvider');
  }

  return context;
};

const useAuthUserSetDispatch = (): IAuthUserSetDispatch => {
  const context = useContext(AuthUserSetDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthUserSetDispatch must be used within a AuthUserProvider');
  }

  return context;
};

export { AuthUserProvider, useAuthUserState, useAuthUserSetDispatch };
