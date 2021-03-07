import { HTMLAttributes, KeyboardEventHandler, ReactNode, Ref, RefAttributes, RefObject } from 'react';

export type Merge<T, P> = P & Omit<T, keyof P>;

export type UnionStringArray<T extends Readonly<string[]>> = T[number];

export type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;

export type LiteralUnion<T extends U, U extends never = string> = T | (U & { _?: never });

export type AnyFunction<T = never> = (...args: T[]) => never;

export type FunctionArguments<T extends (...args: infer R) => never> = T extends (...args: infer R) => never
  ? R
  : never;

export type Dict<T = unknown> = Record<string, T>;

export type MaybeRenderProp<P> = ReactNode | ((props: P) => ReactNode);

export type Booleanish = boolean | 'true' | 'false';

export type StringOrNumber = string | number;

export type HTMLProps<T = never> = Omit<HTMLAttributes<T>, 'color' | 'width' | 'height'> & RefAttributes<T>;

export type PropGetter<T extends HTMLElement = never, P = Record<string, unknown>> = (
  props?: Merge<HTMLProps<T>, P>,
  ref?: Ref<never> | RefObject<never>
) => Merge<HTMLProps<T>, P>;

export type EventKeys =
  | 'ArrowDown'
  | 'ArrowUp'
  | 'ArrowLeft'
  | 'ArrowRight'
  | 'Enter'
  | 'Space'
  | 'Tab'
  | 'Backspace'
  | 'Control'
  | 'Meta'
  | 'Home'
  | 'End'
  | 'PageDown'
  | 'PageUp'
  | 'Delete'
  | 'Escape'
  | ' '
  | 'Shift';

export type EventKeyMap = Partial<Record<EventKeys, KeyboardEventHandler>>;
