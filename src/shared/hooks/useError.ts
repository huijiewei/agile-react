import { useContext } from 'react';
import {
  ErrorDispatcherContext,
  ErrorStateContext,
  IErrorDispatcherContext,
  IErrorStateContext,
} from '@shared/contexts/ErrorContext';

export const useErrorState = (): IErrorStateContext => {
  const context = useContext(ErrorStateContext);

  if (context === undefined) {
    throw new Error('useErrorState must be used within a ErrorStateProvider');
  }

  return context;
};
export const useErrorDispatcher = (): IErrorDispatcherContext => {
  const context = useContext(ErrorDispatcherContext);

  if (context === undefined) {
    throw new Error('useErrorDispatcher must be used within a ErrorDispatcherProvider');
  }

  return context;
};

const useError = (): [IErrorStateContext, IErrorDispatcherContext] => {
  return [useErrorState(), useErrorDispatcher()];
};

export default useError;
