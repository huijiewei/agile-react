import useSWR from 'swr';
import { ListResponse } from '@admin/services/types';
import { HttpMessage, useHttp } from '@shared/contexts/HttpContext';
import { MutatorCallback } from 'swr/dist/types';
import { useState } from 'react';
import { HttpError, requestFlatry } from '@shared/utils/http';
import { AdminGroup } from '@admin/services/useAdminGroup';

export type Admin = {
  id: number;
  name: string;
  phone: string;
  email: string;
  avatar: string;
  adminGroupId: number;
  adminGroup?: AdminGroup;
  createdAt?: string;
};

const ADMIN_API = 'admins';

type UseAdminAll = {
  loading: boolean;
  admins: ListResponse<Admin> | undefined;
  mutate: (
    data?: ListResponse<Admin> | Promise<ListResponse<Admin>> | MutatorCallback<ListResponse<Admin>> | undefined,
    shouldRevalidate?: boolean | undefined
  ) => Promise<ListResponse<Admin> | undefined>;
};

const useAdminAll = (): UseAdminAll => {
  const { apiGet } = useHttp();

  const { data, error, mutate } = useSWR<ListResponse<Admin>>(ADMIN_API, (url) => apiGet(url));

  const loading = !data && !error;

  return {
    loading,
    admins: data,
    mutate,
  };
};

type UseAdminView = {
  loading: boolean;
  admin: Admin | undefined;
  mutate: (
    data?: Promise<Admin | undefined> | MutatorCallback<Admin | undefined> | Admin | undefined,
    shouldRevalidate?: boolean
  ) => Promise<Admin | undefined>;
};

const useAdminView = (id: string): UseAdminView => {
  const { apiGet } = useHttp();
  const { data, error, mutate } = useSWR<Admin | undefined>(ADMIN_API + '/' + id, (url) => apiGet(url));

  const loading = !data && !error;

  return {
    loading,
    admin: data,
    mutate,
  };
};

type UseAdminSubmit = {
  loading: boolean;
  submitAdmin: (id: number, admin: Admin) => Promise<{ data: Admin | undefined; error: HttpError | undefined }>;
};

const useAdminSubmit = (): UseAdminSubmit => {
  const { apiPost, apiPut } = useHttp();
  const [loading, setLoading] = useState(false);

  const submitAdmin = async (id: number, admin: Admin) => {
    setLoading(true);

    const { data, error } = await requestFlatry<Admin>(
      id > 0 ? apiPut(`${ADMIN_API}/${id}`, admin) : apiPost(ADMIN_API, admin)
    );

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    submitAdmin,
  };
};

type UseAdminDelete = {
  loading: boolean;
  deleteAdmin: (id: number) => Promise<{ data: HttpMessage | undefined; error: HttpError | undefined }>;
};

const useAdminDelete = (): UseAdminDelete => {
  const [loading, setLoading] = useState(false);

  const { apiDelete } = useHttp();

  const deleteAdmin = async (id: number) => {
    setLoading(true);

    const { data, error } = await requestFlatry<HttpMessage>(apiDelete(`${ADMIN_API}/${id}`));

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    deleteAdmin,
  };
};

export { useAdminAll, useAdminView, useAdminSubmit, useAdminDelete };
