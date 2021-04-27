import { useCallback, useEffect, useRef } from 'react';

const useMountedState = (): (() => boolean) => {
  const mountedRef = useRef(false);
  const get = useCallback(() => mountedRef.current, []);

  useEffect(() => {
    mountedRef.current = true;

    return () => {
      mountedRef.current = false;
    };
  }, []);

  return get;
};

export { useMountedState };
