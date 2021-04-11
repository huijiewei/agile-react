import Axios, { AxiosRequestConfig } from 'axios';
import { flatry } from '@shared/utils/util';
import { Dict } from '@shared/utils/types';

export const UnauthorizedHttpCode = 401;
export const UnprocessableEntityHttpCode = 422;

export const HttpGetMethod = ['GET', 'HEAD'];

export type HttpRequestConfig = AxiosRequestConfig & {
  [key: string]: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HttpResponse<T = any> = {
  data: T;
  status: number;
  statusText: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  headers: any;
  config: HttpRequestConfig;
  request?: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HttpError<T = any> = Error & {
  config: HttpRequestConfig;
  code?: string;
  request?: unknown;
  response?: HttpResponse<T>;
};

export type HttpInstance = {
  apiGet: <T>(url: string, params?: unknown, historyBack?: boolean) => Promise<T>;
  apiPost: <T>(url: string, data: unknown, params?: unknown, historyBack?: boolean) => Promise<T>;
  apiPut: <T>(url: string, data: unknown, params?: unknown, historyBack?: boolean) => Promise<T>;
  apiDelete: <T>(url: string, params?: unknown, historyBack?: boolean) => Promise<T>;
  apiDownload: (
    method: HttpMethod,
    url: string,
    params?: unknown,
    data?: unknown,
    historyBack?: boolean
  ) => Promise<boolean>;
};

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

export const bindUnprocessableEntityErrors = (
  error: HttpError,
  setError: (field: string, message: string) => void,
  clearErrors: (field?: string | string[] | undefined) => void
): Dict<string> | null => {
  const result: Dict<string> = {};

  clearErrors();

  if (!error || !error.response || !error.response.status || error.response.status !== 422) {
    return null;
  }

  const violations: {
    field: string;
    message: string;
  }[] = Array.isArray(error.response.data.violations)
    ? error.response.data.violations
    : Array.isArray(error.response.data)
    ? error.response.data
    : [];

  if (violations.length === 0) {
    return null;
  }

  violations.map((violation) => {
    const field = violation.field.split('.').pop() as string;

    setError(field, violation.message);

    result[field] = violation.message;
  });

  return result;
};

const saveFile = (response: HttpResponse | undefined): boolean => {
  if (!response) {
    return false;
  }

  let filename = response.headers['x-suggested-filename'];

  if (!filename) {
    filename = response.headers['content-disposition'].match(/filename="(.+)"/)[1];
  }

  if (filename) {
    const url = URL.createObjectURL(
      new Blob([response.data], {
        type: response.headers['content-type'],
      })
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', decodeURIComponent(filename));
    link.click();
    URL.revokeObjectURL(url);

    return true;
  } else {
    return false;
  }
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
    apiGet: (url: string, params: unknown = null, historyBack = true) => {
      const config = {
        params: params,
        __historyBack: historyBack,
      };

      return axios.get(url, config);
    },
    apiPost: (url: string, data: unknown, params: unknown = null, historyBack = false) => {
      const config = {
        params: params,
        __historyBack: historyBack,
      };

      return axios.post(url, data, config);
    },
    apiPut: (url: string, data: unknown, params: unknown = null, historyBack = false) => {
      const config = {
        params: params,
        __historyBack: historyBack,
      };

      return axios.put(url, data, config);
    },
    apiDelete: (url: string, params: unknown = null, historyBack = false) => {
      const config = {
        params: params,
        __historyBack: historyBack,
      };

      return axios.delete(url, config);
    },
    apiDownload: async (
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
