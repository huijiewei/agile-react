import { Description, PageResponse, UseAll } from '@admin/services/types';
import { Admin } from '@admin/services/useAdmin';
import { useHttp } from '@shared/contexts/HttpContext';
import useSWR, { SWRConfiguration } from 'swr';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';

type AdminLog = {
  id: number;
  admin: Admin;
  status: Description<number>;
  type: Description<string>;
  method: string;
  action: string;
  params: string;
  exception: string;
  remoteAddr: string;
  userAgent: string;
  createdAt: string;
};

const ADMIN_LOG_API = 'admin-logs';

const useAdminLogAll = (withSearchFields = false, options?: SWRConfiguration): UseAll<PageResponse<AdminLog>> => {
  const { apiGet } = useHttp();
  const { search } = useLocation();

  const { data, error, mutate } = useSWR<PageResponse<AdminLog>>(
    [ADMIN_LOG_API, search],
    (url, search) => {
      const params = {
        ...queryString.parse(search),
        withSearchFields: withSearchFields ? 'true' : undefined,
      };

      return apiGet(url, params);
    },
    options
  );

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
};

export { useAdminLogAll };
