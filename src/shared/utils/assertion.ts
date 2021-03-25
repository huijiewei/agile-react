export const __DEV__ = process.env.NODE_ENV !== 'production';

export const isBrowser = (): boolean => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};
