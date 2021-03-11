import { useCallback } from 'react';
import { useAxios } from '@shared/contexts/AxiosContext';
import { saveFile } from '@shared/utils/util';
import { AxiosRequestConfig } from 'axios';

const useRequest = (): UseRequestReturn => {
  const axios = useAxios();

  const httpGet = useCallback(
    (url, params = null, historyBack = true) => {
      return axios.get(url, {
        params: params,
        __historyBack: historyBack,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const httpPost = useCallback(
    (url, data, params = null, historyBack = false) => {
      return axios.post(url, data, {
        params: params,
        __historyBack: historyBack,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const httpPut = useCallback(
    (url, data, params = null, historyBack = false) => {
      return axios.put(url, data, {
        params: params,
        __historyBack: historyBack,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const httpDelete = useCallback(
    (url, params = null, historyBack = false) => {
      return axios.delete(url, {
        params: params,
        __historyBack: historyBack,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const httpDownload = useCallback(
    (method, url, params = null, data = null, historyBack = false) => {
      const config = {
        url: url,
        method: method,
        timeout: 120 * 1000,
        params: params,
        data: data,
        responseType: 'blob',
        __historyBack: historyBack,
      } as AxiosRequestConfig;

      axios.request(config).then((response) => {
        return saveFile(response);
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  return { httpPut, httpGet, httpPost, httpDelete, httpDownload };
};

export type UseRequestReturn = ReturnType<typeof useRequest>;

export default useRequest;
