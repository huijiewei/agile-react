import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { PageResponse } from './types';
import { useHttp } from '@shared/contexts/HttpContext';

type User = {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  createdIp: string;
  createdFrom: {
    description: string;
  };
  createdAt: string;
};

const USER_API = 'users';

const useUserAll = (withSearchFields = false): { loading: boolean; data: PageResponse<User> | undefined } => {
  const { apiGet } = useHttp();
  const [searchParams] = useSearchParams();
  const { data, error } = useSWR<PageResponse<User>>(
    USER_API + '?' + (withSearchFields ? 'withSearchFields=true' : '') + searchParams.toString(),
    (url) => apiGet(url)
  );

  const loading = !data && !error;

  return {
    loading,
    data,
  };
};

const useUserView = (id: string): { data: User | undefined; loading: boolean } => {
  const { apiGet } = useHttp();
  const { data, error } = useSWR<User | undefined>(USER_API + '/' + id, (url) => apiGet(url));

  const loading = !data && !error;

  return {
    loading,
    data,
  };
};

export { useUserAll, useUserView };
