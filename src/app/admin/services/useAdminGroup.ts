import useSWR from 'swr';
import { ListResponse } from '@admin/services/types';
import { HttpMessage, useHttp } from '@shared/contexts/HttpContext';
import { MutatorCallback } from 'swr/dist/types';
import { useState } from 'react';
import { HttpError, requestFlatry } from '@shared/utils/http';

export type AdminGroup = {
  id: number;
  name: string;
  permissions?: string[];
};

const ADMIN_GROUP_API = 'admin-groups';

type UseAdminGroupAll = { loading: boolean; adminGroups: ListResponse<AdminGroup> | undefined };

const useAdminGroupAll = (): UseAdminGroupAll => {
  const { apiGet } = useHttp();

  const { data, error } = useSWR<ListResponse<AdminGroup>>(ADMIN_GROUP_API, (url) => apiGet(url));

  const loading = !data && !error;

  return {
    loading,
    adminGroups: data,
  };
};

type UseAdminGroupView = {
  loading: boolean;
  adminGroup: AdminGroup | undefined;
  mutate: (
    data?: Promise<AdminGroup | undefined> | MutatorCallback<AdminGroup | undefined> | AdminGroup | undefined,
    shouldRevalidate?: boolean
  ) => Promise<AdminGroup | undefined>;
};

const useAdminGroupView = (id: string): UseAdminGroupView => {
  const { apiGet } = useHttp();
  const { data, error, mutate } = useSWR<AdminGroup | undefined>(ADMIN_GROUP_API + '/' + id, (url) => apiGet(url));

  const loading = !data && !error;

  return {
    loading,
    adminGroup: data,
    mutate,
  };
};

type UseAdminGroupSubmit = {
  loading: boolean;
  submitAdminGroup: (
    id: number,
    adminGroup: AdminGroup
  ) => Promise<{ data: AdminGroup | undefined; error: HttpError | undefined }>;
};

const useAdminGroupSubmit = (): UseAdminGroupSubmit => {
  const { apiPost, apiPut } = useHttp();
  const [loading, setLoading] = useState(false);

  const submitAdminGroup = async (id: number, adminGroup: AdminGroup) => {
    setLoading(true);

    const { data, error } = await requestFlatry<AdminGroup>(
      id > 0 ? apiPut(`${ADMIN_GROUP_API}/${id}`, adminGroup) : apiPost(ADMIN_GROUP_API, adminGroup)
    );

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    submitAdminGroup,
  };
};

type UseAdminGroupDelete = {
  loading: boolean;
  deleteAdminGroup: (id: number) => Promise<{ data: HttpMessage | undefined; error: HttpError | undefined }>;
};

const useAdminGroupDelete = (): UseAdminGroupDelete => {
  const [loading, setLoading] = useState(false);

  const { apiDelete } = useHttp();

  const deleteAdminGroup = async (id: number) => {
    setLoading(true);

    const { data, error } = await requestFlatry<HttpMessage>(apiDelete(`${ADMIN_GROUP_API}/${id}`));

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    deleteAdminGroup,
  };
};

export { useAdminGroupAll, useAdminGroupView, useAdminGroupSubmit, useAdminGroupDelete };
