import { useCallback } from 'react';
import { useAxios } from '@shared/contexts/AxiosContext';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const useRequest = () => {
  const axios = useAxios();

  const httpGet = useCallback(
    (url, params = null, historyBack = true) => {
      return axios.get(url, {
        params: params,
        __historyBack: historyBack,
      });
    },
    [axios]
  );

  const httpPost = useCallback(
    (url, data, params = null, historyBack = false) => {
      return axios.post(url, {
        data: data,
        params: params,
        __historyBack: historyBack,
      });
    },
    [axios]
  );

  const httpPut = useCallback(
    (url, data, params = null, historyBack = false) => {
      return axios.put(url, {
        data: data,
        params: params,
        __historyBack: historyBack,
      });
    },
    [axios]
  );

  const httpDelete = useCallback(
    (url, params = null, historyBack = false) => {
      return axios.delete(url, {
        params: params,
        __historyBack: historyBack,
      });
    },
    [axios]
  );

  const httpDownload = useCallback(
    (method, url, params = null, data = null, historyBack = false) => {
      const config = {
        url: url,
        method: method,
        timeout: 120 * 1000,
        params: params,
        data: data,
      };

      config['responseType'] = 'blob';
      config['__historyBack'] = historyBack;

      axios.request(config).then((response) => {
        let filename = response.headers['x-suggested-filename'];

        if (!filename) {
          filename = response.headers['content-disposition'].match(/filename="(.+)"/)[1];
        }

        if (filename) {
          const url = window.URL.createObjectURL(
            new Blob([response.data], {
              type: response.headers['content-type'],
            })
          );
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', decodeURIComponent(filename));
          link.click();
          window.URL.revokeObjectURL(url);

          return true;
        } else {
          return false;
        }
      });
    },
    [axios]
  );

  return { httpPut, httpGet, httpPost, httpDelete, httpDownload };
};

export default useRequest;
