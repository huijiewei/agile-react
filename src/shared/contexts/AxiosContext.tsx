import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

export interface EncodedQuery {
  [key: string]: string | (string | null)[] | null | undefined;
}

const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

const createAxios = (
  baseUrl: string | undefined | null,
  onRequest?: (config: AxiosRequestConfig) => AxiosRequestConfig,
  onSuccess?: (response: AxiosResponse) => AxiosResponse | Promise<AxiosResponse>,
  onError?: (error: AxiosError) => Promise<AxiosError> | null,
  paramsSerializer?: (params: unknown) => string
) => {
  const axiosInstance = Axios.create({
    baseURL: baseUrl || undefined,
    paramsSerializer: paramsSerializer,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      return onRequest ? onRequest(config) : config;
    },
    (error) => {
      return onError ? onError(error) : error;
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return onSuccess ? onSuccess(response) : response;
    },
    (error) => {
      return onError ? onError(error) : error;
    }
  );

  return axiosInstance;
};

type AxiosProviderProps = {
  baseUrl: string | null | undefined;
  onRequest: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onSuccess: (response: AxiosResponse) => Promise<AxiosResponse> | AxiosResponse;
  onError: (error: AxiosError) => Promise<AxiosError> | null;
  paramsSerializer: (params: unknown) => string;
};

const AxiosProvider = ({
  children,
  baseUrl,
  onRequest,
  onSuccess,
  onError,
  paramsSerializer,
}: PropsWithChildren<AxiosProviderProps>) => {
  const axios = useMemo(() => {
    return createAxios(baseUrl, onRequest, onSuccess, onError, paramsSerializer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>;
};

const useAxios = (): AxiosInstance => {
  const context = useContext(AxiosContext);

  if (context === undefined) {
    throw new Error('useAxios must be used within a AxiosProvider');
  }

  return context;
};

export { AxiosProvider, useAxios };
