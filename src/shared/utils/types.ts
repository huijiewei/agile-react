import { HTMLAttributes, Ref, RefAttributes, RefObject } from 'react';

export type Merge<T, P> = P & Omit<T, keyof P>;
export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
export type FunctionArguments<T extends (...args: infer R) => never> = T extends (...args: infer R) => never
  ? R
  : never;
export type Booleanish = boolean | 'true' | 'false';

export type StringOrNumber = string | number;

export type HTMLProps<T = never> = Omit<HTMLAttributes<T>, 'color' | 'width' | 'height'> & RefAttributes<T>;

export type PropGetter<T extends HTMLElement = never, P = Record<string, unknown>> = (
  props?: Merge<HTMLProps<T>, P>,
  ref?: Ref<never> | RefObject<never>
) => Merge<HTMLProps<T>, P>;
