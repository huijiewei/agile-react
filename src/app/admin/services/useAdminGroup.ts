import useSWR from 'swr';
import { ListResponse, UseAll, UseView } from '@admin/services/types';
import { HttpMessage, useHttp } from '@shared/contexts/HttpContext';
import { useState } from 'react';
import { HttpError, requestFlatry } from '@shared/utils/http';

export type AdminGroup = {
  id: number;
  name: string;
  permissions?: string[];
};

const ADMIN_GROUP_API = 'admin-groups';

const useAdminGroupAll = (): UseAll<ListResponse<AdminGroup>> => {
  const { apiGet } = useHttp();

  const { data, error, mutate } = useSWR<ListResponse<AdminGroup>>(ADMIN_GROUP_API, (url) => apiGet(url));

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
};

const useAdminGroupView = (id: string): UseView<AdminGroup> => {
  const { apiGet } = useHttp();
  const { data, error, mutate } = useSWR<AdminGroup | undefined>(ADMIN_GROUP_API + '/' + id, (url) => apiGet(url));

  const loading = !data && !error;

  return {
    loading,
    data,
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
