import { useHttp } from '@shared/contexts/HttpContext';
import useSWR from 'swr';

export type AdminGroupPermission = {
  name: string;
  actionId: string;
  children?: AdminGroupPermission[];
  combines?: string[];
};

const useAdminGroupPermissions = (): {
  loading: boolean;
  adminGroupPermissions: AdminGroupPermission[] | undefined;
} => {
  const { apiGet } = useHttp();
  const { data, error } = useSWR<AdminGroupPermission[] | undefined>('misc/admin-group-permissions', (url) =>
    apiGet(url)
  );

  const loading = !data && !error;

  return {
    loading,
    adminGroupPermissions: data,
  };
};

export { useAdminGroupPermissions };
