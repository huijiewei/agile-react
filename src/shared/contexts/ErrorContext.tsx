import React, { createContext, FC, useCallback, useState } from 'react';

export interface IErrorStateContext {
  message: string;
  historyBack: boolean;
}

export interface IErrorDispatcherContext {
  addError: (message: string, historyBack: boolean) => void;
  removeError: () => void;
}

export const ErrorStateContext = createContext<IErrorStateContext | undefined>(undefined);

export const ErrorDispatcherContext = createContext<IErrorDispatcherContext | undefined>(undefined);

const ErrorProvider: FC = ({ children }) => {
  const [error, setError] = useState<IErrorStateContext | null>(null);

  const addError = useCallback((message, historyBack) => {
    setError({
      message,
      historyBack,
    });
  }, []);

  const removeError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ErrorDispatcherContext.Provider
      value={{
        addError: addError,
        removeError: removeError,
      }}
    >
      <ErrorStateContext.Provider value={error}>{children}</ErrorStateContext.Provider>
    </ErrorDispatcherContext.Provider>
  );
};

export default ErrorProvider;
