import { createContext, FC, useCallback, useContext, useState } from 'react';

interface IErrorState {
  message: string;
  historyBack: boolean;
}

interface IErrorSetDispatch {
  (message: string | null, historyBack?: boolean): void;
}

const ErrorStateContext = createContext<IErrorState | undefined>(undefined);

const ErrorSetDispatchContext = createContext<IErrorSetDispatch | undefined>(undefined);

const ErrorProvider: FC = ({ children }) => {
  const [errorState, setErrorState] = useState<IErrorState | null>(null);

  const setError = useCallback((message, historyBack = false) => {
    if (message === null) {
      setErrorState(null);
    } else {
      setErrorState({ message, historyBack });
    }
  }, []);

  return (
    <ErrorSetDispatchContext.Provider value={setError}>
      <ErrorStateContext.Provider value={errorState}>{children}</ErrorStateContext.Provider>
    </ErrorSetDispatchContext.Provider>
  );
};

const useErrorState = (): IErrorState => {
  const context = useContext(ErrorStateContext);

  if (context === undefined) {
    throw new Error('useErrorState must be used within a ErrorProvider');
  }

  return context;
};

const useErrorSetDispatch = (): IErrorSetDispatch => {
  const context = useContext(ErrorSetDispatchContext);

  if (context === undefined) {
    throw new Error('useErrorAddDispatch must be used within a ErrorProvider');
  }

  return context;
};

export { ErrorProvider, useErrorState, useErrorSetDispatch };
