import useSWR, { cache, mutate } from 'swr';
import { MutatorCallback } from 'swr/dist/types';
import { useHttp } from '@shared/contexts/HttpContext';

interface AuthMenu {
  label: string;
  url: string;
  open: boolean;
  icon: string;
  children: AuthMenu[] | null;
}

export interface AuthUser {
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

export interface Auth {
  currentUser: AuthUser | null;
  groupMenus: AuthMenu[];
  groupPermissions: string[];
}

export interface AuthLogin extends Auth {
  accessToken: string;
}

const AUTH_API = 'auth/account';

interface UseAuth extends Auth {
  loading: boolean;
  mutate: (
    data?: Promise<Auth> | MutatorCallback<Auth> | Auth,
    shouldRevalidate?: boolean
  ) => Promise<Auth | undefined>;
}

const useAuth = (): UseAuth => {
  const { get } = useHttp();

  const { data, error, mutate } = useSWR<Auth>(AUTH_API, (url: string) => get<Auth>(url), {
    revalidateOnMount: !cache.has(AUTH_API),
  });

  const loading = !data && !error;

  return {
    ...(data || { currentUser: null, groupMenus: [], groupPermissions: [] }),
    loading,
    mutate,
  };
};

export const setAuth = async (auth: Auth): Promise<void> => {
  await mutate(AUTH_API, auth, false);
};

export const refreshAuth = async (): Promise<void> => {
  await mutate(AUTH_API);
};

export default useAuth;
