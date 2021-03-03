import { useAxios } from '@shared/contexts/AxiosContext';
import useSWR from 'swr';
import { responseInterface } from 'swr/dist/types';
import { AxiosError, AxiosInstance } from 'axios';
import useLazySWR from '@shared/hooks/useLazySWR';
import { useRef } from 'react';

const axiosGet = async (axios: AxiosInstance, url, params, historyBack) => {
  return await axios.get(url, {
    params: params,
    __historyBack: historyBack,
  });
};

export const useHttpGet = <T>(url: string, params = null, historyBack = true): responseInterface<T, AxiosError> => {
  const axios = useAxios();

  return useSWR([url, params], async (url, params) => {
    const { data } = await axiosGet(axios, url, params, historyBack);

    return data;
  });
};

export const useHttpLazyGet = <T>(url: string, params = null, historyBack = true): responseInterface<T, AxiosError> => {
  const axios = useAxios();

  return useLazySWR([url, params], async (url, params) => {
    const { data } = await axiosGet(axios, url, params, historyBack);

    return data;
  });
};
