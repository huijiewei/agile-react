import { AxiosError, AxiosRequestConfig } from 'axios';
import { createContext } from 'react';

interface HttpProviderProps {
  url: string;
  onRequest: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onError: (error: AxiosError) => Promise<AxiosError>;
  paramsSerializer: (params: any) => string;
}

export const HttpContext = createContext<Partial<HttpProviderProps>>({});

const HttpProvider = HttpContext.Provider;

export default HttpProvider;
