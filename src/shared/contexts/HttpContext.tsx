import Axios, { AxiosError, AxiosRequestConfig, CancelTokenSource, Method } from 'axios';
import { createContext, useCallback, useContext, useEffect, useReducer, useRef } from 'react';

interface IState {
  loading: boolean;
  error: AxiosError | null;
  data: any;
}

enum RequestAction {
  REQUEST_START = 'REQUEST_START',
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

interface IAction {
  type: RequestAction;
  payload?: any;
}

const initialState: IState = {
  loading: true,
  error: null,
  data: null,
};

const httpReducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case RequestAction.REQUEST_START:
      return { loading: true, error: null, data: null };
    case RequestAction.REQUEST_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case RequestAction.REQUEST_ERROR:
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

const axiosRequest = (method, url, query, body, historyBack, dispatch, httpContext, cancelToken) => {
  dispatch({ type: RequestAction.REQUEST_START });

  const axiosInstance = Axios.create({
    baseURL: httpContext.url,
    paramsSerializer: httpContext.paramsSerializer,
    cancelToken: cancelToken,
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
      dispatch({ type: RequestAction.REQUEST_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: RequestAction.REQUEST_ERROR, payload: error });
    });
};

const useHttp = (
  method: Method,
  url: string,
  query: any = null,
  body: any = null,
  historyBack = true,
  lazy = false
) => {
  const httpContext = useContext(HttpContext);

  const cancelSource = useRef<CancelTokenSource>();

  const [{ data, error, loading }, dispatch] = useReducer(httpReducer, initialState);

  const request = useCallback(() => {
    if (cancelSource.current) {
      cancelSource.current?.cancel();
    }

    axiosRequest(method, url, query, body, historyBack, dispatch, httpContext, cancelSource.current?.token);
  }, [method, url, JSON.stringify(query), JSON.stringify(body), historyBack]);

  useEffect(() => {
    if (!lazy) {
      request();
    }
  }, [lazy, request]);

  return {
    data,
    error,
    loading,
    request,
  };
};

const useGet = (url: string, query: any = null, body: any = null, historyBack = true, lazy = false) => {
  return useHttp('GET', url, query, body, historyBack, lazy);
};

const usePost = (url: string, query: any = null, body: any = null, historyBack = false, lazy = true) => {
  return useHttp('POST', url, query, body, historyBack, lazy);
};

const usePut = (url: string, query: any = null, body: any = null, historyBack = false, lazy = true) => {
  return useHttp('PUT', url, query, body, historyBack, lazy);
};

const useDelete = (url: string, query: any = null, body: any = null, historyBack = false, lazy = true) => {
  return useHttp('DELETE', url, query, body, historyBack, lazy);
};

interface HttpProviderProps {
  url: string;
  onRequest: (config: AxiosRequestConfig) => AxiosRequestConfig;
  onError: (error: AxiosError) => Promise<AxiosError>;
  paramsSerializer: (params: any) => string;
}

const HttpContext = createContext<Partial<HttpProviderProps>>({});

const HttpProvider = HttpContext.Provider;

export { HttpProvider, useHttp, useGet, usePost, usePut, useDelete };
