import React, { createContext, useState, ReactNode, FC } from 'react';

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

const ErrorProvider: FC = ({ children }: ErrorProviderProps) => {
  const [error, setError] = useState<IError | null>(null);

  return (
    <ErrorContext.Provider
      value={{
        error,
        addError: (message, historyBack) => setError({ message, historyBack }),
        removeError: () => setError(null),
      }}
    >
      {children}
    </ErrorContext.Provider>
  );
};

export default ErrorProvider;
