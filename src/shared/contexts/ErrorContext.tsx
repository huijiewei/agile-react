import { createContext, ReactNode, useContext, useMemo, useState, useRef } from 'react';

interface IErrorState {
  message: string;
  historyBack: boolean;
}

interface IErrorDispatch {
  setError: (message: string, historyBack?: boolean) => void;
  resetError: () => void;
}

const ErrorStateContext = createContext<IErrorState | null | undefined>(undefined);
const ErrorDispatchContext = createContext<IErrorDispatch | undefined>(undefined);

const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorState, setErrorState] = useState<IErrorState | null>(null);

  const errorDispatch = useMemo(() => {
    return {
      setError(message: string, historyBack = false) {
        setErrorState({ message, historyBack });
      },
      resetError() {
        setErrorState(null);
      },
    };
  }, []);

  return (
    <ErrorDispatchContext.Provider value={errorDispatch}>
      <ErrorStateContext.Provider value={errorState}>{children}</ErrorStateContext.Provider>
    </ErrorDispatchContext.Provider>
  );
};

const useErrorState = (): IErrorState | null => {
  const context = useContext(ErrorStateContext);

  if (context === undefined) {
    throw new Error('useErrorState must be used within a ErrorProvider');
  }

  return context;
};

const useErrorDispatch = (): IErrorDispatch => {
  const context = useContext(ErrorDispatchContext);

  if (context === undefined) {
    throw new Error('useErrorDispatch must be used within a ErrorProvider');
  }

  return context;
};

export { ErrorProvider, useErrorState, useErrorDispatch };
