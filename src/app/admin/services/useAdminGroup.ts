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
};

type UseAdminGroupPostResult = Promise<{ data: AdminGroup | undefined; error: HttpError | undefined }>;

type UseAdminGroupCreate = UseAdminGroupPost & {
  create: (form: AdminGroup) => UseAdminGroupPostResult;
};

const useAdminGroupCreate = (): UseAdminGroupCreate => {
  const { post } = useHttp();
  const [loading, setLoading] = useState(false);

  const create = async <T>(form: T) => {
    setLoading(true);

    const { data, error } = await requestFlatry<AdminGroup>(post('admin-groups', form));

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    create,
  };
};

type UseAdminGroupEdit = UseAdminGroupPost & {
  edit: (id: number, form: AdminGroup) => UseAdminGroupPostResult;
};

const useAdminGroupEdit = (): UseAdminGroupEdit => {
  const { put } = useHttp();
  const [loading, setLoading] = useState(false);

  const edit = async <T>(id: number, form: T) => {
    setLoading(true);

    const { data, error } = await requestFlatry<AdminGroup>(put('admin-groups/' + id, form));

    setLoading(false);

    return {
      data,
      error,
    };
  };

  return {
    loading,
    edit,
  };
};

const useAdminGroupDelete = () => {};

export { useAdminGroupAll, useAdminGroupView, useAdminGroupCreate, useAdminGroupEdit, useAdminGroupDelete };
