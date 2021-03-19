import useSWR, {cache, mutate} from 'swr';
import {MutatorCallback} from 'swr/dist/types';
import {useHttp} from "@shared/contexts/HttpContext";

interface AuthUserMenu {
  label: string;
  url: string;
  open: boolean;
  icon: string;
  children: AuthUserMenu[] | null;
}

export interface AuthUserUser {
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

interface AuthUser {
  currentUser: AuthUserUser;
  groupMenus: AuthUserMenu[];
  groupPermissions: string[];
}

export interface AuthUserLogin extends AuthUser {
  accessToken: string;
}

const AUTH_USER_API = 'auth/account';

type UseAuthUserReturn = {
  loading: boolean;
  authUser: AuthUser | undefined;
  mutate: (
    data?: Promise<AuthUser> | MutatorCallback<AuthUser> | AuthUser,
    shouldRevalidate?: boolean
  ) => Promise<AuthUser | undefined>;
};

const useAuthUser = (): UseAuthUserReturn => {
  const {get} = useHttp();

  const {data, error, mutate} = useSWR<AuthUser>(AUTH_USER_API, (url: string) => get<AuthUser>(url), {
    revalidateOnMount: !cache.has(AUTH_USER_API),
  });

  const loading = !data && !error;

  return {
    loading,
    authUser: data,
    mutate,
  };
};

export const setAuthUser = async (authUser: AuthUser): Promise<void> => {
  await mutate(AUTH_USER_API, authUser, false);
};

export const refreshAuthUser = async (): Promise<void> => {
  await mutate(AUTH_USER_API);
};

export default useAuthUser;
