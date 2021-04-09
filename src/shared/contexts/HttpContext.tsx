import { createContext, PropsWithChildren, useContext } from 'react';
import {
  createHttp,
  httpBaseUrl,
  HttpInstance,
  httpOnError,
  httpOnRequest,
  httpOnSuccess,
  httpParamsSerializer,
} from '@shared/utils/http';

const HttpContext = createContext<HttpInstance | undefined>(undefined);

type AxiosProviderProps = {
  baseUrl: httpBaseUrl;
  onRequest: httpOnRequest;
  onSuccess: httpOnSuccess;
  onError: httpOnError;
  paramsSerializer: httpParamsSerializer;
};

const HttpProvider = ({
  children,
  baseUrl,
  onRequest,
  onSuccess,
  onError,
  paramsSerializer,
}: PropsWithChildren<AxiosProviderProps>) => {
  const http = createHttp(baseUrl, onRequest, onSuccess, onError, paramsSerializer);

  return <HttpContext.Provider value={http}>{children}</HttpContext.Provider>;
};

export type HttpMessage = {
  message: string;
};

const useHttp = (): HttpInstance => {
  const context = useContext(HttpContext);

  if (context === undefined) {
    throw new Error('useAxios must be used within a AxiosProvider');
  }

  return context;
};

export { HttpProvider, useHttp };
