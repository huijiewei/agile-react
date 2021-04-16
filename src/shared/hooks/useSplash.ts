import { useEffect } from 'react';

const useSplash = (): void => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      document.getElementById('splash')?.remove();
    }, 200);

    return () => clearTimeout(timeoutId);
  }, []);
};

export { useSplash };
