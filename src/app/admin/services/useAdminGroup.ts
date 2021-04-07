import useSWR from 'swr';
import { ListResponse } from '@admin/services/types';
import { useHttp } from '@shared/contexts/HttpContext';
import { MutatorCallback } from 'swr/dist/types';

export type AdminGroup = {
  id: number;
  name: string;
  permissions?: string[];
};

const ADMIN_GROUP_API = 'admin-groups';

const useAdminGroupAll = (): { loading: boolean; data: ListResponse<AdminGroup> | undefined } => {
  const { get } = useHttp();

  const { data, error } = useSWR<ListResponse<AdminGroup>>(ADMIN_GROUP_API, (url) => get(url));

  const loading = !data && !error;

  return {
    loading,
    data,
  };
};

const useAdminGroupView = (
  id: string
): {
  mutate: (
    data?: Promise<AdminGroup | undefined> | MutatorCallback<AdminGroup | undefined> | AdminGroup | undefined,
    shouldRevalidate?: boolean
  ) => Promise<AdminGroup | undefined>;
  data: AdminGroup | undefined;
  loading: boolean;
} => {
  const { get } = useHttp();
  const { data, error, mutate } = useSWR<AdminGroup | undefined>(ADMIN_GROUP_API + '/' + id, (url) => get(url));

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
};

export { useAdminGroupAll, useAdminGroupView };
