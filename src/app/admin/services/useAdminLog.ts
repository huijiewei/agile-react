import { Description, PageResponse, UseAll } from '@admin/services/types';
import { Admin } from '@admin/services/useAdmin';
import { useHttp } from '@shared/contexts/HttpContext';
import useSWR from 'swr';
import { useSearchParams } from 'react-router-dom';

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

const useAdminLogAll = (withSearchFields = false): UseAll<PageResponse<AdminLog>> => {
  const { apiGet } = useHttp();
  const [searchParams] = useSearchParams();

  const { data, error, mutate } = useSWR<PageResponse<AdminLog>>(
    ADMIN_LOG_API + '?' + (withSearchFields ? 'withSearchFields=true' : '') + searchParams.toString(),
    (url) => apiGet(url)
  );

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
};

export { useAdminLogAll };
