import { useSearchParams } from 'react-router-dom';
import useSWR from 'swr';
import { PageResponse, UseAll, UseView } from './types';
import { HttpMessage, useHttp } from '@shared/contexts/HttpContext';
import { HttpError, requestFlatry } from '@shared/utils/http';
import { useState } from 'react';

export type User = {
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

const useUserAll = (withSearchFields = false): UseAll<PageResponse<User>> => {
  const { apiGet } = useHttp();
  const [searchParams] = useSearchParams();
  const { data, error, mutate } = useSWR<PageResponse<User>>(
    USER_API + '?' + (withSearchFields ? 'withSearchFields=true' : '') + searchParams.toString(),
    (url) => apiGet(url)
  );

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
};

const useUserView = (id: string): UseView<User> => {
  const { apiGet } = useHttp();
  const { data, error, mutate } = useSWR<User | undefined>(USER_API + '/' + id, (url) => apiGet(url));

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
};

type UseUserDelete = {
  loading: boolean;
  deleteUser: (id: number) => Promise<{ data: HttpMessage | undefined; error: HttpError | undefined }>;
};

const useUserDelete = (): UseUserDelete => {
  const [loading, setLoading] = useState(false);

  const { apiDelete } = useHttp();

  const deleteUser = async (id: number) => {
    setLoading(true);

    const { data, error } = await requestFlatry<HttpMessage>(apiDelete(`${USER_API}/${id}`));

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    deleteUser,
  };
};

export { useUserAll, useUserView, useUserDelete };
