import { useEffect } from 'react';

const useSplash = (): void => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      console.log('Remove splash');

      document.getElementById('splash')?.remove();
    }, 600);

    return () => clearTimeout(timeoutId);
  }, []);
};

export default useSplash;
