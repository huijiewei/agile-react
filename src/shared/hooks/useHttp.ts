import { useCallback, useContext, useEffect, useReducer } from 'react';
import Axios, { AxiosError, Method } from 'axios';
import { HttpContext } from '@shared/contexts/HttpContext';

interface IState {
  loading: boolean;
  error: AxiosError | null;
  data: any;
}

interface IAction {
  type: ActionEnum;
  payload?: any;
}

enum ActionEnum {
  REQUEST_START = 'REQUEST_START',
  REQUEST_SUCCESS = 'REQUEST_SUCCESS',
  REQUEST_ERROR = 'REQUEST_ERROR',
}

const initialState = {
  loading: true,
  error: null,
  data: null,
};

const reducer = (state: IState, action: IAction) => {
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

const axiosRequest = (method, url, query, body, historyBack, dispatch, httpContext) => {
  dispatch({ type: ActionEnum.REQUEST_START });

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
  lazy = false,
  historyBack = true,
) => {
  const httpContext = useContext(HttpContext);

  const [state, dispatch] = useReducer(reducer, initialState);

  const request = useCallback(axiosRequest, []);

  const queryJson = JSON.stringify(query);
  const bodyJson = JSON.stringify(body);

  useEffect(() => {
    if (!lazy) {
      request(method, url, query, body, historyBack, dispatch, httpContext);
    }
  }, [method, url, queryJson, bodyJson, historyBack]);

  return { ...state, request };
};

export default useHttp;
