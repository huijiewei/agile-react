import useSWR from 'swr';
import { ListResponse } from '@admin/services/types';
import { useHttp } from '@shared/contexts/HttpContext';
import { MutatorCallback } from 'swr/dist/types';
import { useState } from 'react';
import { HttpError, requestFlatry } from '@shared/utils/http';

export type AdminGroup = {
  id: number;
  name: string;
  permissions?: string[];
};

const ADMIN_GROUP_API = 'admin-groups';

type UseAdminGroupAll = { loading: boolean; data: ListResponse<AdminGroup> | undefined };

const useAdminGroupAll = (): UseAdminGroupAll => {
  const { get } = useHttp();

  const { data, error } = useSWR<ListResponse<AdminGroup>>(ADMIN_GROUP_API, (url) => get(url));

  const loading = !data && !error;

  return {
    loading,
    data,
  };
};

type UseAdminGroupView = {
  mutate: (
    data?: Promise<AdminGroup | undefined> | MutatorCallback<AdminGroup | undefined> | AdminGroup | undefined,
    shouldRevalidate?: boolean
  ) => Promise<AdminGroup | undefined>;
  data: AdminGroup | undefined;
  loading: boolean;
};

const useAdminGroupView = (id: string): UseAdminGroupView => {
  const { get } = useHttp();
  const { data, error, mutate } = useSWR<AdminGroup | undefined>(ADMIN_GROUP_API + '/' + id, (url) => get(url));

  const loading = !data && !error;

  return {
    loading,
    data,
    mutate,
  };
};

type UseAdminGroupPost = {
  loading: boolean;
  submit: (adminGroup: AdminGroup) => Promise<{ data: AdminGroup | undefined; error: HttpError | undefined }>;
};

const useAdminGroupSubmit = (): UseAdminGroupPost => {
  const { post, put } = useHttp();
  const [loading, setLoading] = useState(false);

  const submit = async (adminGroup: AdminGroup) => {
    setLoading(true);

    const { data, error } = await requestFlatry<AdminGroup>(
      adminGroup.id > 0 ? put(ADMIN_GROUP_API + '/' + adminGroup.id, adminGroup) : post(ADMIN_GROUP_API, adminGroup)
    );

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    submit,
  };
};

const useAdminGroupDelete = () => {};

export { useAdminGroupAll, useAdminGroupView, useAdminGroupSubmit, useAdminGroupDelete };
