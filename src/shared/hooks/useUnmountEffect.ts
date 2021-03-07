import { useEffect } from 'react';

export const useUnmountEffect = (fn: () => void, deps: unknown[] = []): void => {
  return useEffect(
    () => () => fn(),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    deps
  );
};
