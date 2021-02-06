import React, { createContext, useState, useCallback, ReactNode } from 'react';

export interface IError {
  message: string;
  historyBack: boolean;
}

export interface IErrorContext {
  error: IError | null;
  addError: (message: string, historyBack: boolean) => void;
  removeError: () => void;
}

export const ErrorContext = createContext<IErrorContext>({
  error: null,
  addError: () => void {},
  removeError: () => void {},
});

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider = ({ children }: ErrorProviderProps): JSX.Element => {
  const [error, setError] = useState<IError | null>(null);

  const value = {
    error,
    addError: useCallback((message, historyBack) => setError({ message, historyBack }), []),
    removeError: useCallback(() => setError(null), []),
  };

  return <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>;
};
