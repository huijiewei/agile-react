import { AxiosError, AxiosRequestConfig } from 'axios';
import { createContext } from 'react';

export interface HttpConfig {
  url: string;
  onRequest: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onError: (error: AxiosError) => Promise<AxiosError>;
  paramsSerializer: (params: any) => string;
}

export const HttpContext = createContext<Partial<HttpConfig>>({});

const HttpProvider = HttpContext.Provider;

export default HttpProvider;
