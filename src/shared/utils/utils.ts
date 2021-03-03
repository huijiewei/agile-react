export const formatUrl = (url: string): string => {
  if (url === 'site/index') {
    return 'home';
  }

  if (url.endsWith('/index')) {
    return url.substr(0, url.length - 6);
  }

  return url;
};

export const mapNestedPath = (nests, keyPrefix = 'n-') => {
  const result = {};

  const traverseItems = (items, parents, keyPrefix) => {
    items.forEach((item, index) => {
      const key = keyPrefix + index;

      parents.forEach((parent) => {
        result[parent] = [...(result[parent] || []), key];
      });

      if (item.children) {
        traverseItems(item.children, [...parents, key], key + '-');
      } else {
        result[key] = [];
      }
    });
  };

  traverseItems(nests, [], keyPrefix);

  return result;
};
