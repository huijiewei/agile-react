export type Dict<T> = {
  [key in string | number]: T;
};

export type StringOrNumber = string | number;
