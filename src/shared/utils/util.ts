import { Dict } from '@shared/utils/types';

export const sleep = (delay: number): Promise<null> => {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
};

export const flatry = <T, E>(promise: Promise<T>): Promise<{ data: T | undefined; error: E | undefined }> => {
  return promise.then((data) => ({ data, error: undefined })).catch((error) => ({ data: undefined, error }));
};

type tabledObjectOptions = {
  name: string;
  property: string;
  callback?: (obj: Dict) => string;
};

export type tabledObjectResult = {
  name: string;
  value: string;
};

export const tabledObject = (object: Dict, options: tabledObjectOptions[] = []): tabledObjectResult[] => {
  const result: tabledObjectResult[] = [];

  options.forEach((option) => {
    if (object.hasOwnProperty(option.property)) {
      if (option.callback) {
        result.push({ name: option.name, value: option.callback(object[option.property]) });
      } else {
        result.push({ name: option.name, value: object[option.property] });
      }
    }
  });

  return result;
};
