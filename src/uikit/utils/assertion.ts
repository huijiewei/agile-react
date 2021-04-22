export const __DEV__ = process.env.NODE_ENV !== 'production';

export const isBrowser = (): boolean => {
  return Boolean(globalThis?.document);
};
