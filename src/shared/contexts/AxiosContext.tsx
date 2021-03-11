import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createContext, FC, PropsWithChildren, useContext, useMemo } from 'react';

interface EncodedQuery {
  [key: string]: string | (string | null)[] | null | undefined;
}

interface AxiosProviderProps {
  baseUrl: string;
  onRequest: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onSuccess: (response: AxiosResponse) => Promise<unknown>;
  onError: (error: AxiosError) => Promise<AxiosError>;
  paramsSerializer: (params: EncodedQuery) => string;
}

const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

const createAxios = (baseUrl, onRequest, onSuccess, onError, paramsSerializer) => {
  const axiosInstance = Axios.create({
    baseURL: baseUrl,
    paramsSerializer: paramsSerializer,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (onRequest) {
        return onRequest(config);
      }

      return config;
    },
    (error) => {
      return onError(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      if (onSuccess) {
        return onSuccess(response);
      }

      return response;
    },
    (error) => {
      return onError(error);
    }
  );

  return axiosInstance;
};

const AxiosProvider: FC = ({
  children,
  baseUrl,
  onRequest,
  onSuccess,
  onError,
  paramsSerializer,
}: PropsWithChildren<AxiosProviderProps>) => {
  console.log('AxiosProvider render');
  const axios = createAxios(baseUrl, onRequest, onSuccess, onError, paramsSerializer);

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
