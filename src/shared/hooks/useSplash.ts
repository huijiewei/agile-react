import { useEffect } from 'react';

export const useSplash = (): void => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.getElementById('splash')?.remove();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, []);
};
