export const __DEV__ = process.env.NODE_ENV !== 'production';

export const isFunction = (value: unknown): boolean => {
  return typeof value === 'function';
};
