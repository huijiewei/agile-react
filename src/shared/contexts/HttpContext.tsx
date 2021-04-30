import { createContext, PropsWithChildren, useContext, useEffect, useRef } from 'react';
import {
  createHttp,
  httpBaseUrl,
  HttpInstance,
  httpOnError,
  httpOnRequest,
  httpOnSuccess,
  httpParamsSerializer,
} from '@shared/utils/http';
import Axios, { CancelToken, CancelTokenSource } from 'axios';

const HttpContext = createContext<HttpInstance | undefined>(undefined);

type HttpProviderProps = {
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
}: PropsWithChildren<HttpProviderProps>): JSX.Element => {
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

const useCancelToken = (): (() => CancelToken) => {
  const axiosSource = useRef<CancelTokenSource>();

  const newCancelToken = () => {
    axiosSource.current = Axios.CancelToken.source();

    return axiosSource.current.token;
  };

  useEffect(
    () => () => {
      axiosSource.current && axiosSource.current.cancel();
    },
    []
  );

  return newCancelToken;
};

export { HttpProvider, useHttp, useCancelToken };
