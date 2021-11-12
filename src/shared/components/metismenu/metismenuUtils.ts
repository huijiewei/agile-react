import { Dict } from '@shared/utils/types';

export const formatUrl = (url: string): string => {
  if (url === 'site/index') {
    return 'home';
  }

  if (url.endsWith('/index')) {
    return url.substr(0, url.length - 6);
  }

  return url;
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

export const getActivePath = (pathname: string, menus: Dict[]): string => {
  const paths = pathname.split('/').filter((split) => split.length > 0);
  const groupMenuUrls = deepSearch('url', menus);

  const pathTable = [];

  for (let i = paths.length - 1; i >= 0; i--) {
    pathTable.push(paths.slice(0, i + 1));
  }

  for (let i = 0; i < pathTable.length; i++) {
    const url = pathTable[i].join('/');
    const find = groupMenuUrls.map((menu) => formatUrl(menu)).includes(url);

    if (find) {
      return '/' + url;
    }
  }

  return pathname;
};
