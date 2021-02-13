import { useCallback, useContext, useEffect, useState } from 'react';
import Axios, { Method } from 'axios';
import { HttpContext } from '@shared/contexts/HttpContext';

const axiosRequest = (method, url, query, body, historyBack, state, setState, httpContext) => {
  setState({ ...state, error: null, loading: true });

  const axiosInstance = Axios.create({
    baseURL: httpContext.url,
    paramsSerializer: httpContext.paramsSerializer,
  });

  axiosInstance.interceptors.request.use(
    (config) => {
      if (httpContext.onRequest) {
        return httpContext.onRequest(config);
      }

      return config;
    },
    (error) => {
      return httpContext.onError?.(error);
    },
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return httpContext.onError?.(error);
    },
  );

  axiosInstance
    .request({
      method: method,
      url: url,
      historyBack: historyBack,
      params: query,
      data: body,
    })
    .then((response) => {
      setState({ ...state, data: response.data });
    })
    .catch((error) => {
      setState({ ...state, error: error });
    })
    .finally(() => {
      setState({ ...state, loading: false });
    });
};

const useHttp = (
  method: Method,
  url: string,
  query: any = null,
  body: any = null,
  lazy = false,
  historyBack = true,
): {
  request: (method, url, query, body, historyBack, state, setState, httpContext) => void;
  data: null;
  error: null;
  loading: boolean;
} => {
  const httpContext = useContext(HttpContext);

  const [state, setState] = useState({
    data: null,
    error: null,
    loading: !lazy,
  });

  const request = useCallback(axiosRequest, [axiosRequest]);

  useEffect(() => {
    if (!lazy) {
      request(method, url, query, body, historyBack, state, setState, httpContext);
    }
  }, [method, url, query, body, historyBack]);

  return { ...state, request };
};

export default useHttp;
