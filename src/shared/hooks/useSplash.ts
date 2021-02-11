import useTimeout from '@shared/hooks/useTimeout';

const useSplash = (): void => {
  useTimeout(() => {
    document.getElementById('splash')?.remove();
  }, 600);
};

export default useSplash;
