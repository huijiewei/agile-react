import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

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

export const ErrorProvider = ({ children }: { children: ReactNode }): JSX.Element => {
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

  const setError = (message: string, historyBack = false) => {
    errorDispatch({ message, historyBack });
  };

  const resetError = () => {
    errorDispatch(null);
  };

  return { setError, resetError };
};
