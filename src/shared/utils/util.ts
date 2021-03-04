import { AxiosResponse } from 'axios';

export const formatUrl = (url: string): string => {
  if (url === 'site/index') {
    return 'home';
  }

  if (url.endsWith('/index')) {
    return url.substr(0, url.length - 6);
  }

  return url;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const flatry = (promise) =>
  promise.then((data) => ({ data, error: undefined })).catch((error) => ({ data: undefined, error }));

export const saveFile = (response: AxiosResponse): boolean => {
  let filename = response.headers['x-suggested-filename'];

  if (!filename) {
    filename = response.headers['content-disposition'].match(/filename="(.+)"/)[1];
  }

  if (filename) {
    const url = URL.createObjectURL(
      new Blob([response.data], {
        type: response.headers['content-type'],
      })
    );
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', decodeURIComponent(filename));
    link.click();
    URL.revokeObjectURL(url);

    return true;
  } else {
    return false;
  }
};
