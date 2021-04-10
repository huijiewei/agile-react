import { useHttp } from '@shared/contexts/HttpContext';
import useSWR from 'swr';
import { AdminGroup } from '@admin/services/useAdminGroup';
import { HttpError, requestFlatry } from '@shared/utils/http';

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

const useAdminGroups = (): {
  fetch: () => Promise<{ data: AdminGroup[] | undefined; error: HttpError | undefined }>;
} => {
  const { apiGet } = useHttp();

  const fetch = async () => {
    return requestFlatry<AdminGroup[]>(apiGet('misc/admin-groups'));
  };

  return {
    fetch,
  };
};

export { useAdminGroupPermissions, useAdminGroups };
