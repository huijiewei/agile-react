import { useEffect } from 'react';

const useSplash = (): void => {
  useEffect(() => {
    const timerId = window.setTimeout(() => {
      document.getElementById('splash')?.remove();
    }, 600);
    return () => window.clearTimeout(timerId);
  }, []);
};

export default useSplash;
