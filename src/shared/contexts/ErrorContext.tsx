import React, { createContext, useState, FC, PropsWithChildren } from 'react';

interface IError {
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

const ErrorProvider: FC<PropsWithChildren<void>> = ({ children }: PropsWithChildren<void>) => {
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
