import { useHttp } from '@shared/contexts/HttpContext';
import useSWR from 'swr';

export type AdminGroupPermission = {
  name: string;
  actionId: string;
  children?: AdminGroupPermission[];
  combines?: string[];
};

const useAdminGroupPermissions = (): {
  data: AdminGroupPermission[] | undefined;
  loading: boolean;
} => {
  const { get } = useHttp();
  const { data, error } = useSWR<AdminGroupPermission[] | undefined>('misc/admin-group-permissions', (url) => get(url));

  const loading = !data && !error;

  return {
    loading,
    data,
  };
};

export { useAdminGroupPermissions };
