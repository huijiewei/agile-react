import { useLocation } from 'react-router-dom';
import useSWR from 'swr';
import { PageResponse, UseAll, UseView } from './types';
import { HttpMessage, useHttp } from '@shared/contexts/HttpContext';
import { HttpError, requestFlatry } from '@shared/utils/http';
import { useState } from 'react';
import queryString from 'query-string';

type UserAddressDistrict = {
  id: number;
  name: string;
  code: string;
};

type UserAddressUser = {
  id: number;
  name: string;
  avatar: string;
};

export type UserAddress = {
  id: number;
  name: string;
  phone: string;
  alias: string;
  address: string;
  districtAddress: string;
  fullAddress: string;
  districtPath?: UserAddressDistrict[];
  user: UserAddressUser;
  createdAt?: string;
};

const USER_ADDRESS_API = 'user-addresses';

const useUserAddressAll = (withSearchFields = false): UseAll<PageResponse<UserAddress>> => {
  const { apiGet } = useHttp();
  const { search } = useLocation();

  const { data, error, mutate } = useSWR<PageResponse<UserAddress>>([USER_ADDRESS_API, search], (url, search) => {
    const params = {
      ...queryString.parse(search),
      withSearchFields: withSearchFields ? 'true' : undefined,
    };

    return apiGet(url, params);
  });

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
};

const useUserAddressView = (id: string): UseView<UserAddress> => {
  const { apiGet } = useHttp();
  const { data, error, mutate } = useSWR<UserAddress | undefined>(USER_ADDRESS_API + '/' + id, (url) => apiGet(url));

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
};

type UseUserAddressSubmit = {
  loading: boolean;
  submitUserAddress: (
    id: number,
    user: UserAddress
  ) => Promise<{ data: UserAddress | undefined; error: HttpError | undefined }>;
};

const useUserAddressSubmit = (): UseUserAddressSubmit => {
  const { apiPost, apiPut } = useHttp();
  const [loading, setLoading] = useState(false);

  const submitUserAddress = async (id: number, userAddress: UserAddress) => {
    setLoading(true);

    const { data, error } = await requestFlatry<UserAddress>(
      id > 0 ? apiPut(`${USER_ADDRESS_API}/${id}`, userAddress) : apiPost(USER_ADDRESS_API, userAddress)
    );

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    submitUserAddress,
  };
};

type UseUserAddressDelete = {
  loading: boolean;
  deleteUserAddress: (id: number) => Promise<{ data: HttpMessage | undefined; error: HttpError | undefined }>;
};

const useUserAddressDelete = (): UseUserAddressDelete => {
  const [loading, setLoading] = useState(false);

  const { apiDelete } = useHttp();

  const deleteUserAddress = async (id: number) => {
    setLoading(true);

    const { data, error } = await requestFlatry<HttpMessage>(apiDelete(`${USER_ADDRESS_API}/${id}`));

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    deleteUserAddress,
  };
};

export { useUserAddressAll, useUserAddressView, useUserAddressSubmit, useUserAddressDelete };
