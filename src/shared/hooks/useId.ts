import { useSafeLayoutEffect } from './useSafeLayoutEffect';
import { useEffect, useState } from 'react';

/**
 * Credit: https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx
 */
let serverHandoffComplete = false;
let id = 0;
const genId = () => ++id;

export const useId = (idFromProps?: string | null): string | undefined => {
  const initialId = idFromProps || (serverHandoffComplete ? genId() : null);

  const [id, setId] = useState<string | number | null>(initialId);

  useSafeLayoutEffect(() => {
    if (id === null) {
      setId(genId());
    }
  }, []);

  useEffect(() => {
    if (!serverHandoffComplete) {
      serverHandoffComplete = true;
    }
  }, []);
  return id != null ? String(id) : undefined;
};

export const useIds = (idProp?: string, ...prefixes: string[]): string[] => {
  const id = useId(idProp);

  return prefixes.map((prefix) => `${prefix}-${id}`);
};
