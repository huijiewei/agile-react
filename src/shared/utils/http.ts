import Axios, { AxiosRequestConfig } from 'axios';
import { flatry, saveFile } from '@shared/utils/util';

export interface HttpRequestConfig extends AxiosRequestConfig {
  [key: string]: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HttpResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any;
  config: HttpRequestConfig;
  request?: unknown;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface HttpError<T = any> extends Error {
  config: HttpRequestConfig;
  code?: string;
  request?: unknown;
  response?: HttpResponse<T>;
}

export interface HttpInstance {
  get: <T>(url: string, params?: unknown, historyBack?: boolean) => Promise<T>;
  post: <T>(url: string, data: unknown, params?: unknown, historyBack?: boolean) => Promise<T>;
  put: <T>(url: string, data: unknown, params?: unknown, historyBack?: boolean) => Promise<T>;
  delete: <T>(url: string, params?: unknown, historyBack?: boolean) => Promise<T>;
  download: (
    method: HttpMethod,
    url: string,
    params?: unknown,
    data?: unknown,
    historyBack?: boolean
  ) => Promise<boolean>;
}

export type HttpParams = Record<string, unknown> | URLSearchParams | undefined;
export type HttpMethod = 'GET' | 'POST' | 'PUT';
export type httpBaseUrl = string | null | undefined;
export type httpOnRequest = (config: HttpRequestConfig) => HttpRequestConfig;
export type httpOnSuccess = (response: HttpResponse) => HttpResponse | Promise<HttpResponse>;
export type httpOnError = (error: HttpError) => HttpError | Promise<HttpError> | null;
export type httpParamsSerializer = (params: HttpParams) => string;

export const requestFlatry = <T>(
  promise: Promise<T>
): Promise<{ data: T | undefined; error: HttpError | undefined }> => {
  return flatry<T, HttpError>(promise);
};

const createAxios = (
  baseUrl: httpBaseUrl,
  onRequest?: httpOnRequest,
  onSuccess?: httpOnSuccess,
  onError?: httpOnError,
  paramsSerializer?: httpParamsSerializer
) => {
  const axiosInstance = Axios.create({
    baseURL: baseUrl || undefined,
    paramsSerializer: paramsSerializer,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return onRequest ? onRequest(config as HttpRequestConfig) : config;
    },
    (error: HttpError) => {
      return onError ? onError(error) : error;
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return onSuccess ? onSuccess(response as HttpResponse) : response;
    },
    (error: HttpError) => {
      return onError ? onError(error) : error;
    }
  );

  return axiosInstance;
};

export const createHttp = (
  baseUrl: httpBaseUrl,
  onRequest: httpOnRequest,
  onSuccess: httpOnSuccess,
  onError: httpOnError,
  paramsSerializer: httpParamsSerializer
): HttpInstance => {
  const axios = createAxios(baseUrl, onRequest, onSuccess, onError, paramsSerializer);

  return {
    get: (url: string, params: unknown = null, historyBack = true) => {
      const config = {
        params: params,
        __historyBack: historyBack,
      };

      return axios.get(url, config);
    },
    post: (url: string, data: unknown, params: unknown = null, historyBack = false) => {
      const config = {
        params: params,
        __historyBack: historyBack,
      };

      return axios.post(url, data, config);
    },
    put: (url: string, data: unknown, params: unknown = null, historyBack = false) => {
      const config = {
        params: params,
        __historyBack: historyBack,
      };

      return axios.put(url, data, config);
    },
    delete: (url: string, params: unknown = null, historyBack = false) => {
      const config = {
        params: params,
        __historyBack: historyBack,
      };

      return axios.delete(url, config);
    },
    download: async (
      method: HttpMethod,
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

      return saveFile(data as HttpResponse);
    },
  };
};
