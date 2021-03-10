import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useCallbackRef } from '@shared/hooks/useCallbackRef';
import { runIfFn } from '@shared/utils/function';

export const useControllableProp = <T>(prop: T | undefined, state: T): readonly [boolean, T] => {
  const isControlled = prop !== undefined;
  const value = isControlled && typeof prop !== 'undefined' ? prop : state;
  return [isControlled, value] as const;
};

export interface UseControllableStateProps<T> {
  value?: T;
  defaultValue?: T | (() => T);
  onChange?: (value: T) => void;
  name?: string;
}

export const useControllableState = <T>(props: UseControllableStateProps<T>): useControllableStateReturn => {
  const { value: valueProp, defaultValue, onChange } = props;
  const handleChange = useCallbackRef(onChange);

  const [valueState, setValue] = useState(defaultValue as T);
  const isControlled = valueProp !== undefined;

  const value = isControlled ? (valueProp as T) : valueState;

  const updateValue = useCallback(
    (next: SetStateAction<T>) => {
      const nextValue = runIfFn(next, value);
      if (!isControlled) {
        setValue(nextValue);
      }
      handleChange(nextValue);
    },
    [isControlled, handleChange, value]
  );

  return [value, updateValue] as [T, Dispatch<SetStateAction<T>>];
};

type useControllableStateReturn = ReturnType<typeof useControllableState>;
