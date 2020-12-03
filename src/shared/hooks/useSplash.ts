import { useEffect } from 'react';

const useSplash = (): void => {
  useEffect(() => {
    const timer = setTimeout(() => {
      document.getElementById('splash')?.remove();
    }, 600);
    return () => clearTimeout(timer);
  }, []);
};

export default useSplash;
