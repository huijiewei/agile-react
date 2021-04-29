import { Dict } from '@shared/utils/types';

export const sleep = (delay: number): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

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
