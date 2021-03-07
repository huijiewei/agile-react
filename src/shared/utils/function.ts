import { FunctionArguments } from '@shared/utils/types';

export const callAllHandlers = <T extends (event: unknown) => void>(...fns: (T | undefined)[]) => {
  return function func(event: FunctionArguments<T>[0]): unknown {
    fns.some((fn) => {
      fn?.(event);
      return event?.defaultPrevented;
    });
  };
};
