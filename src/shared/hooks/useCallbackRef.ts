import { useCallback, useRef } from 'react';
import { useSafeLayoutEffect } from '@shared/hooks/useSafeLayoutEffect';

export const useCallbackRef = <T extends (...args: unknown[]) => unknown>(fn: T | undefined): T => {
  const ref = useRef(fn);

  useSafeLayoutEffect(() => {
    ref.current = fn;
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useCallback(((...args) => ref.current?.(...args)) as T, []);
};
