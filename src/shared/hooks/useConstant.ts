import { useRef } from 'react';

const useConstant = <ValueType>(fn: () => ValueType): ValueType => {
  const ref = useRef<{ v: ValueType }>();

  if (!ref.current) {
    ref.current = { v: fn() };
  }

  return ref.current.v;
};

export { useConstant };
