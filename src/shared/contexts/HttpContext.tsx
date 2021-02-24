import Axios, { AxiosError, AxiosRequestConfig, CancelTokenSource, Method } from 'axios';
import { createContext, useCallback, useContext, useEffect, useReducer, useRef } from 'react';

interface IState {
  loading: boolean;
  error: AxiosError | null;
  data: any;
}

enum ActionEnum {
  REQUEST_START = 'REQUEST_START',
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

interface IAction {
  type: ActionEnum;
  payload?: any;
}

const initialState: IState = {
  loading: true,
  error: null,
  data: null,
};

const reducer = (state: IState, action: IAction): IState => {
  switch (action.type) {
    case ActionEnum.REQUEST_START:
      return { loading: true, error: null, data: null };
    case ActionEnum.REQUEST_SUCCESS:
      return { loading: false, error: null, data: action.payload };
    case ActionEnum.REQUEST_ERROR:
      return { loading: false, error: action.payload, data: null };
    default:
      return state;
  }
};

const axiosRequest = (method, url, query, body, historyBack, dispatch, httpContext, cancelToken) => {
  dispatch({ type: ActionEnum.REQUEST_START });

  const axiosInstance = Axios.create({
    baseURL: httpContext.url,
    paramsSerializer: httpContext.paramsSerializer,
    cancelToken: cancelToken,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (httpContext.onRequest) {
        return httpContext.onRequest(config);
      }

      config['__historyBack'] = historyBack;

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
      dispatch({ type: ActionEnum.REQUEST_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: ActionEnum.REQUEST_ERROR, payload: error });
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

  const [{ data, error, loading }, dispatch] = useReducer(reducer, initialState);

  const queryJson = JSON.stringify(query);
  const bodyJson = JSON.stringify(body);

  const request = useCallback(() => {
    if (cancelSource.current) {
      cancelSource.current?.cancel();
    }

    axiosRequest(method, url, query, body, historyBack, dispatch, httpContext, cancelSource.current?.token);
  }, [method, url, queryJson, bodyJson, historyBack]);

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
