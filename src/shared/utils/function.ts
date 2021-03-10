import { FunctionArguments } from '@shared/utils/types';
import { isFunction } from '@shared/utils/assertion';

export const runIfFn = <T, U>(valueOrFn: T | ((...fnArgs: U[]) => T), ...args: U[]): ((...fnArgs: U[]) => T) | T => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return isFunction(valueOrFn) ? valueOrFn(...args) : valueOrFn;
};

export const callAllHandlers = <T extends (event: unknown) => void>(...fns: (T | undefined)[]) => {
  return function func(event: FunctionArguments<T>[0]): unknown {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
};
