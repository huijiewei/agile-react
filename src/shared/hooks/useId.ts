import { useSafeLayoutEffect } from './useSafeLayoutEffect';
import { useEffect, useState } from 'react';

/**
 * Credit: https://github.com/reach/reach-ui/blob/develop/packages/auto-id/src/index.tsx
 */
let handoffComplete = false;
let id = 0;
const genId = () => ++id;

export const useId = (idProp?: string, prefix?: string): string => {
  const initialId = idProp || (handoffComplete ? genId() : null);
  const [uid, setUid] = useState<string | number | null>(initialId);

  useSafeLayoutEffect(() => {
    if (uid === null) {
      setUid(genId());
    }
  }, []);

  useEffect(() => {
    if (!handoffComplete) {
      handoffComplete = true;
    }
  }, []);

  const id = uid != null ? uid.toString() : undefined;
  return (prefix ? `${prefix}-${id}` : id) as string;
};

export const useIds = (idProp?: string, ...prefixes: string[]): string[] => {
  const id = useId(idProp);
  return prefixes.map((prefix) => `${prefix}-${id}`);
};
