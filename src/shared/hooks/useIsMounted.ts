import { useRef, useEffect } from 'react';

const useIsMounted = (): {
  readonly current: boolean;
} => {
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return isMounted;
};

export default useIsMounted;
