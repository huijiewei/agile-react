import { createContext, FC, ReactNode, useMemo } from 'react';
import Axios, { AxiosError, AxiosRequestConfig } from 'axios';

export const HttpContext = createContext(null);

interface HttpConfig {
  baseURL: '';
  onRequest: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onError: (error: AxiosError) => void;
  paramsSerializer: (params: any) => string;
}

interface HttpProviderProps {
  config: HttpConfig;
  children: ReactNode;
}

const HttpProvider: FC = ({ config, children }: HttpProviderProps) => {
  const axios = useMemo(() => {
    const axios = Axios.create({ baseURL: config.baseURL, paramsSerializer: config.paramsSerializer });

    axios.interceptors.request.use(
      (requestConfig) => {
        return config.onRequest(requestConfig);
      },
      (error) => {
        return config.onError(error);
      },
    );

    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        return config.onError(error);
      },
    );

    return axios;
  }, []);

  return <HttpContext.Provider value={axios}>{children}</HttpContext.Provider>;
};

export default HttpProvider;
