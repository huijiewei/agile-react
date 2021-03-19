import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { PageResponse } from './types';
import { useHttp } from '@shared/contexts/HttpContext';

interface User {
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
}

const USER_API = 'users';

export const useUserAll = (withSearchFields = false): { loading: boolean; data: PageResponse<User> | undefined } => {
  const { get } = useHttp();
  const [searchParams] = useSearchParams();
  const { data, error } = useSWR<PageResponse<User>>(
    USER_API + '?' + (withSearchFields ? 'withSearchFields=true' : '') + searchParams.toString(),
    (url) => get(url)
  );

  const loading = !data && !error;

  return {
    loading,
    data,
  };
};

export const useUseView = (id: string): { data: User | undefined; loading: boolean } => {
  const { get } = useHttp();
  const { data, error } = useSWR<User | undefined>(USER_API + '/' + id, (url) => get(url));

  const loading = !data && !error;

  return {
    loading,
    data,
  };
};
