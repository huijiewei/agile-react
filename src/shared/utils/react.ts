import React, { MutableRefObject, Ref, RefObject } from 'react';
import { __DEV__, isFunction } from '@shared/utils/assertion';

type ReactRef<T> = Ref<T> | RefObject<T> | MutableRefObject<T>;

export const assignRef = <T = unknown>(ref: ReactRef<T> | undefined, value: T): void => {
  if (ref == null) {
    return;
  }

  if (isFunction(ref)) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref(value);

    return;
  }

  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ref.current = value;
  } catch (error) {
    throw new Error(`Cannot assign value '${value}' to ref '${ref}'`);
  }
};

export const mergeRefs = <T>(...refs: (ReactRef<T> | undefined)[]): ((T) => void) => {
  return (value: T) => {
    refs.forEach((ref) => assignRef(ref, value));
  };
};

export interface CreateContextOptions {
  strict?: boolean;
  errorMessage?: string;
  name?: string;
}

type CreateContextReturn<T> = [React.Provider<T>, () => T, React.Context<T>];

export const createContext = <ContextType>(options: CreateContextOptions = {}): CreateContextReturn<ContextType> => {
  const {
    strict = true,
    errorMessage = 'useContext: `context` is undefined. Seems you forgot to wrap component within the Provider',
    name,
  } = options;

  const Context = React.createContext<ContextType | undefined>(undefined);

  if (__DEV__) {
    Context.displayName = name;
  }

  const useContext = () => {
    const context = React.useContext(Context);

    if (!context && strict) {
      throw new Error(errorMessage);
    }

    return context;
  };

  return [Context.Provider, useContext, Context] as CreateContextReturn<ContextType>;
};
