// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Dict<T = any> = {
  [key in StringOrNumber]: T;
};

export type StringOrNumber = string | number;
