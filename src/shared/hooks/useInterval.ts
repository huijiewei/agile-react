import { useEffect } from 'react';

const useInterval = (fn: () => void, delay: number): void => {
  useEffect(() => {
    const id = setInterval(fn, delay);
    return () => clearInterval(id);
  });
};

export default useInterval;
