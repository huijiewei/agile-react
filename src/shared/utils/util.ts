import { AxiosResponse } from 'axios';

export const deepSearch = <T, K extends keyof T>(needle: string, haystack: T[], found: K[] = []): K[] => {
  Object.keys(haystack).forEach((key) => {
    if (!haystack[key]) {
      return;
    }

    if (key === needle) {
      found.push(haystack[key]);

      return found;
    }
    if (typeof haystack[key] === 'object') {
      return deepSearch(needle, haystack[key], found);
    }
  });

  return found;
};

export const formatUrl = (url: string): string => {
  if (url === 'site/index') {
    return 'home';
  }

  if (url.endsWith('/index')) {
    return url.substr(0, url.length - 6);
  }

  return url;
};

export const flatry = async <T, E>(promise: Promise<T>): Promise<{ data: T | undefined; error: E | undefined }> => {
  return await promise.then((data) => ({ data, error: undefined })).catch((error) => ({ data: undefined, error }));
};

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
