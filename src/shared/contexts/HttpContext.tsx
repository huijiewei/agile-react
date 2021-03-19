import { createContext, PropsWithChildren, useContext, useMemo } from 'react';
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
  const http = useMemo(() => {
    return createHttp(baseUrl, onRequest, onSuccess, onError, paramsSerializer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <HttpContext.Provider value={http}>{children}</HttpContext.Provider>;
};

const useHttp = (): HttpInstance => {
  const context = useContext(HttpContext);

  if (context === undefined) {
    throw new Error('useAxios must be used within a AxiosProvider');
  }

  return context;
};

export { HttpProvider, useHttp };
