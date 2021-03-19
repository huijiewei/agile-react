import { Dict } from '@shared/utils/types';
import { HttpResponse } from '@shared/utils/http';

export const deepSearch = (needle: string, haystack: Dict | Dict[], found: string[] = []): string[] => {
  for (const key in haystack) {
    const value = haystack[key];

    if (!value) {
      continue;
    }

    if (key === needle) {
      found.push(value);
    }

    if (typeof value === 'object') {
      deepSearch(needle, value, found);
    }
  }
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

export const flatry = <T, E>(promise: Promise<T>): Promise<{ data: T | undefined; error: E | undefined }> => {
  return promise.then((data) => ({ data, error: undefined })).catch((error) => ({ data: undefined, error }));
};

export const saveFile = (response: HttpResponse | undefined): boolean => {
  if (!response) {
    return false;
  }

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
