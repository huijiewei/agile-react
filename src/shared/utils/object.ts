import { Dict } from '@shared/utils/types';

export const omit = <T extends Dict, K extends keyof T>(object: T, keys: K[]): Omit<T, K> => {
  const result: Dict = {};

  Object.keys(object).forEach((key) => {
    if (!keys.includes(key as K)) {
      result[key] = object[key];
    }
  });

  return result as Omit<T, K>;
};

export const pick = <T extends Dict, K extends keyof T>(object: T, keys: K[]): { [P in K]: T[P] } => {
  const result = {} as { [P in K]: T[P] };

  keys.forEach((key) => {
    if (key in object) {
      result[key] = object[key];
    }
  });

  return result;
};

export const split = <T extends Dict, K extends keyof T>(object: T, keys: K[]): [{ [P in K]: T[P] }, Omit<T, K>] => {
  const picked: Dict = {};
  const omitted: Dict = {};

  Object.keys(object).forEach((key) => {
    if (keys.includes(key as T[K])) {
      picked[key] = object[key];
    } else {
      omitted[key] = object[key];
    }
  });

  return [picked, omitted] as [{ [P in K]: T[P] }, Omit<T, K>];
};
