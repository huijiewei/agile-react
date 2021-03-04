import Axios, { AxiosError, AxiosInstance, AxiosRequestConfig } from 'axios';
import { createContext, FC, PropsWithChildren, useCallback, useContext, useMemo } from 'react';

interface EncodedQuery {
  [key: string]: string | (string | null)[] | null | undefined;
}

interface AxiosProviderProps {
  baseUrl: string;
  onRequest: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onError: (error: AxiosError) => Promise<AxiosError>;
  paramsSerializer: (params: EncodedQuery) => string;
}

const AxiosContext = createContext<AxiosInstance | undefined>(undefined);

const AxiosProvider: FC = ({
  children,
  baseUrl,
  onRequest,
  onError,
  paramsSerializer,
}: PropsWithChildren<AxiosProviderProps>) => {
  const axios = useMemo(() => {
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
        return response;
      },
      (error) => {
        return onError(error);
      }
    );

    return axiosInstance;
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
