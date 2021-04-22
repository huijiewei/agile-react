import { MutableRefObject, Ref, RefCallback, RefObject } from 'react';

type ReactRef<T> = Ref<T> | RefObject<T> | MutableRefObject<T>;

export const mergedRefs = <T>(...refs: (ReactRef<T> | undefined)[]): RefCallback<T> => {
  return (element) => {
    refs.forEach((ref) => {
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref != null) {
        (ref as MutableRefObject<T | null>).current = element;
      }
    });
  };
};
