import Axios, { AxiosError, AxiosRequestConfig, Method } from 'axios';
import { createContext, useContext, useEffect, useLayoutEffect, useState } from 'react';

interface IState<T> {
  loading: boolean;
  error: AxiosError | null;
  data: T;
}

interface EncodedQuery {
  [key: string]: string | (string | null)[] | null | undefined;
}

const initialState: IState<null> = {
  loading: true,
  error: null,
  data: null,
};

const axiosRequest = (method, url, query, body, historyBack, setState, httpContext) => {
  const axiosInstance = Axios.create({
    baseURL: httpContext.url,
    paramsSerializer: httpContext.paramsSerializer,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      config['__historyBack'] = historyBack;

      if (httpContext.onRequest) {
        return httpContext.onRequest(config);
      }

      return config;
    },
    (error) => {
      return httpContext.onError?.(error);
    }
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return httpContext.onError?.(error);
    }
  );

  axiosInstance
    .request({
      method: method,
      url: url,
      params: query,
      data: body,
    })
    .then((response) => {
      setState({
        loading: false,
        error: null,
        data: response.data,
      });
    })
    .catch((error) => {
      setState({
        loading: false,
        error: error,
        data: null,
      });
    });
};

const useHttp = (
  method: Method,
  url: string,
  query: EncodedQuery | null = null,
  body: EncodedQuery | null = null,
  historyBack = true,
  lazy = false
): IState<null> => {
  const httpContext = useContext(HttpContext);

  const [state, setState] = useState<IState<null>>(initialState);

  const queryJson = JSON.stringify(query);
  const bodyJson = JSON.stringify(body);

  useEffect(() => {
    if (!lazy) {
      axiosRequest(method, url, JSON.parse(queryJson), JSON.parse(bodyJson), historyBack, setState, httpContext);
    }
  }, [method, url, queryJson, bodyJson, historyBack, lazy, httpContext]);

  return {
    ...state,
  };
};

const useGet = (
  url: string,
  query: EncodedQuery | null = null,
  body: EncodedQuery | null = null,
  historyBack = true,
  lazy = false
): IState<null> => {
  return useHttp('GET', url, query, body, historyBack, lazy);
};

const usePost = (
  url: string,
  query: EncodedQuery | null = null,
  body: EncodedQuery | null = null,
  historyBack = false,
  lazy = true
): IState<null> => {
  return useHttp('POST', url, query, body, historyBack, lazy);
};

const usePut = (
  url: string,
  query: EncodedQuery | null = null,
  body: EncodedQuery | null = null,
  historyBack = false,
  lazy = true
): IState<null> => {
  return useHttp('PUT', url, query, body, historyBack, lazy);
};

const useDelete = (
  url: string,
  query: EncodedQuery | null = null,
  body: EncodedQuery | null = null,
  historyBack = false,
  lazy = true
): IState<null> => {
  return useHttp('DELETE', url, query, body, historyBack, lazy);
};

interface HttpProviderProps {
  url: string;
  onRequest: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onError: (error: AxiosError) => Promise<AxiosError>;
  paramsSerializer: (params: EncodedQuery) => string;
}

const HttpContext = createContext<Partial<HttpProviderProps>>({});

const HttpProvider = HttpContext.Provider;

export { HttpProvider, useGet, usePost, usePut, useDelete };
