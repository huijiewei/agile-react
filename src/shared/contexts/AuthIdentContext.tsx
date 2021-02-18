import { createContext, FC, useCallback, useContext, useState } from 'react';

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

interface IAuthIdentState {
  user: IUser | null;
  menus: IMenu[];
  permissions: string[];
}

interface IAuthIdentSetDispatch {
  (user: IUser | null, menus?: IMenu[], permissions?: string[]): void;
}

const AuthIdentStateContext = createContext<IAuthIdentState | undefined>(undefined);
const AuthIdentSetDispatchContext = createContext<IAuthIdentSetDispatch | undefined>(undefined);

const AuthIdentProvider: FC = ({ children }) => {
  const [authIdentState, setAuthIdentState] = useState<IAuthIdentState>({
    user: null,
    menus: [],
    permissions: [],
  });

  const setAuthIdent = useCallback((user, menus = [], permissions = []) => {
    setAuthIdentState({ user, menus, permissions });
  }, []);
  return (
    <AuthIdentSetDispatchContext.Provider value={setAuthIdent}>
      <AuthIdentStateContext.Provider value={authIdentState}>{children}</AuthIdentStateContext.Provider>
    </AuthIdentSetDispatchContext.Provider>
  );
};

const useAuthIdentState = (): IAuthIdentState => {
  const context = useContext(AuthIdentStateContext);

  if (context === undefined) {
    throw new Error('useAuthIdentState must be used within a AuthIdentProvider');
  }

  return context;
};

const useAuthIdentSetDispatch = (): IAuthIdentSetDispatch => {
  const context = useContext(AuthIdentSetDispatchContext);

  if (context === undefined) {
    throw new Error('useAuthIdentSetDispatch must be used within a AuthIdentProvider');
  }

  return context;
};

export { AuthIdentProvider, useAuthIdentState, useAuthIdentSetDispatch };
