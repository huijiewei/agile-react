import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction, useCallback } from 'react';

interface IErrorState {
  message: string;
  historyBack: boolean;
}

interface IErrorDispatch {
  setError: (message: string, historyBack?: boolean) => void;
  resetError: () => void;
}

type ErrorDispatchContextType = Dispatch<SetStateAction<IErrorState | null>>;

const ErrorStateContext = createContext<IErrorState | null | undefined>(undefined);
const ErrorDispatchContext = createContext<ErrorDispatchContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorState, setErrorState] = useState<IErrorState | null>(null);

  return (
    <ErrorDispatchContext.Provider value={setErrorState}>
      <ErrorStateContext.Provider value={errorState}>{children}</ErrorStateContext.Provider>
    </ErrorDispatchContext.Provider>
  );
};

export const useErrorState = (): IErrorState | null => {
  const errorState = useContext(ErrorStateContext);

  if (errorState === undefined) {
    throw new Error('useErrorState must be used within a ErrorProvider');
  }

  return errorState;
};

export const useErrorDispatch = (): IErrorDispatch => {
  const errorDispatch = useContext(ErrorDispatchContext);

  if (errorDispatch === undefined) {
    throw new Error('useErrorDispatch must be used within a ErrorProvider');
  }

  const setError = useCallback(
    (message: string, historyBack = false) => {
      errorDispatch({ message, historyBack });
    },
    [errorDispatch]
  );

  const resetError = useCallback(() => {
    errorDispatch(null);
  }, [errorDispatch]);

  return { setError, resetError };
};
