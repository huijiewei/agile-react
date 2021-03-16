import { useAxios } from '@shared/contexts/AxiosContext';
import { flatry, saveFile } from '@shared/utils/util';
import { AxiosError, AxiosRequestConfig, Method } from 'axios';

type UseRequestType = {
  httpGet: <T>(url: string, params?: unknown, historyBack?: boolean) => Promise<T>;
  httpPost: <T>(url: string, data: unknown, params?: unknown, historyBack?: boolean) => Promise<T>;
  httpPut: <T>(url: string, data: unknown, params?: unknown, historyBack?: boolean) => Promise<T>;
  httpDelete: <T>(url: string, params?: unknown, historyBack?: boolean) => Promise<T>;
  httpDownload: (
    method: Method,
    url: string,
    params?: unknown,
    data?: unknown,
    historyBack?: boolean
  ) => Promise<boolean>;
};

export const requestFlatry = <T>(
  promise: Promise<T>
): Promise<{ data: T | undefined; error: AxiosError | undefined }> => {
  return flatry<T, AxiosError>(promise);
};

const useRequest = (): UseRequestType => {
  const axios = useAxios();

  const httpGet = <T>(url: string, params: unknown = null, historyBack = true) => {
    const config = {
      params: params,
      __historyBack: historyBack,
    } as AxiosRequestConfig;

    return axios.get(url, config) as Promise<T>;
  };

  const httpPost = <T>(url: string, data: unknown, params: unknown = null, historyBack = false) => {
    const config = {
      params: params,
      __historyBack: historyBack,
    } as AxiosRequestConfig;

    return axios.post(url, data, config) as Promise<T>;
  };

  const httpPut = <T>(url: string, data: unknown, params: unknown = null, historyBack = false) => {
    const config = {
      params: params,
      __historyBack: historyBack,
    } as AxiosRequestConfig;

    return axios.put(url, data, config) as Promise<T>;
  };

  const httpDelete = <T>(url: string, params: unknown = null, historyBack = false) => {
    const config = {
      params: params,
      __historyBack: historyBack,
    } as AxiosRequestConfig;

    return axios.delete(url, config) as Promise<T>;
  };

  const httpDownload = async (
    method: Method,
    url: string,
    params: unknown = null,
    body: unknown = null,
    historyBack = false
  ) => {
    const config = {
      url: url,
      method: method,
      timeout: 120 * 1000,
      params: params,
      data: body,
      responseType: 'blob',
      __historyBack: historyBack,
    } as AxiosRequestConfig;

    const { data } = await requestFlatry(axios.request(config));

    return saveFile(data);
  };

  return { httpGet, httpPut, httpPost, httpDelete, httpDownload };
};

export default useRequest;
