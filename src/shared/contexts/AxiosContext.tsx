import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

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

type AxiosProviderProps = {
  baseUrl: string;
  onRequest: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onSuccess: (response: AxiosResponse) => Promise<unknown>;
  onError: (error: AxiosError) => Promise<AxiosError>;
  paramsSerializer: (params: Record<string, unknown>) => string;
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
