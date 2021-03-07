export const __DEV__ = process.env.NODE_ENV !== 'production';

export const isNumber = (value: unknown): boolean => {
  return typeof value === 'number';
};

export const isArray = (value: unknown): boolean => {
  return Array.isArray(value);
};

export const isEmptyArray = (value: unknown): boolean => {
  return isArray(value) && value.length === 0;
};

export const isFunction = (value: unknown): boolean => {
  return typeof value === 'function';
};
