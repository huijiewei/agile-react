import { useToast, UseToastOptions } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { AlertStatus } from '@chakra-ui/alert';

type UseMessage = {
  info: (message: ReactNode, options?: UseToastOptions) => void;
  success: (message: ReactNode, options?: UseToastOptions) => void;
  warning: (message: ReactNode, options?: UseToastOptions) => void;
};

const defaults = {
  duration: 2000,
  position: 'top',
  variant: 'subtle',
  status: 'info',
} as const;

const useMessage = (): UseMessage => {
  const toast = useToast();

  const info = (message: ReactNode, options?: UseToastOptions) => {
    const opts = { ...defaults, ...{ description: message }, ...options };

    return toast(opts);
  };

  const success = (message: ReactNode, options?: UseToastOptions) => {
    const opts = { ...{ status: 'success' as AlertStatus }, ...options };

    return info(message, opts);
  };

  const warning = (message: ReactNode, options?: UseToastOptions) => {
    const opts = { ...{ status: 'warning' as AlertStatus }, ...options };

    return info(message, opts);
  };

  return {
    info,
    success,
    warning,
  };
};

export { useMessage };
