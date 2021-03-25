import { createContext, ReactNode, useContext, useState, Dispatch, SetStateAction, useCallback } from 'react';

type ErrorState = {
  message: string;
  historyBack: boolean;
};

type ErrorDispatch = {
  setError: (message: string, historyBack?: boolean) => void;
  resetError: () => void;
};

type ErrorDispatchContextType = Dispatch<SetStateAction<ErrorState | null>>;

const ErrorStateContext = createContext<ErrorState | null | undefined>(undefined);
const ErrorDispatchContext = createContext<ErrorDispatchContextType | undefined>(undefined);

export const ErrorProvider = ({ children }: { children: ReactNode }) => {
  const [errorState, setErrorState] = useState<ErrorState | null>(null);

  return (
    <ErrorDispatchContext.Provider value={setErrorState}>
      <ErrorStateContext.Provider value={errorState}>{children}</ErrorStateContext.Provider>
    </ErrorDispatchContext.Provider>
  );
};

export const useErrorState = (): ErrorState | null => {
  const errorState = useContext(ErrorStateContext);

  if (errorState === undefined) {
    throw new Error('useErrorState must be used within a ErrorProvider');
  }

  return errorState;
};

export const useErrorDispatch = (): ErrorDispatch => {
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
