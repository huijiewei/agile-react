import { useUnmountEffect } from '@shared/hooks/useUnmountEffect';
import { useCallback, useRef, useState } from 'react';

export const useForceUpdate = (): (() => void) => {
  const unloadingRef = useRef(false);
  const [count, setCount] = useState(0);

  useUnmountEffect(() => {
    unloadingRef.current = true;
  });

  return useCallback(() => {
    if (!unloadingRef.current) {
      setCount(count + 1);
    }
  }, [count]);
};
