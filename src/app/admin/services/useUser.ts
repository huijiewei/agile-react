import useRequest from '@shared/hooks/useRequest';
import { AxiosError } from 'axios';
import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { PageResponse } from './types';

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
  const { httpGet } = useRequest();
  const [searchParams] = useSearchParams();
  const { data, error } = useSWR<PageResponse<User>, AxiosError>(
    USER_API + '?' + (withSearchFields ? 'withSearchFields=true' : '') + searchParams.toString(),
    (url) => httpGet(url)
  );

  const loading = !data && !error;

  return {
    loading,
    data,
  };
};
