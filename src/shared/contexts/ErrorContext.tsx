import { createContext, FC, useCallback, useContext, useState } from 'react';

interface IErrorStateContext {
  show: boolean;
  message: string;
  historyBack: boolean;
}

interface IAction {
  type: ActionEnum;
  payload?: any;
}

const initialState = {
  show: false,
  message: '',
  historyBack: false,
};

enum ActionEnum {
  ERROR_ADD = 'ERROR_ADD',
  ERROR_REMOVE = 'ERROR_REMOVE',
}

interface IErrorAddDispatchContext {
  (message: string, historyBack: boolean): void;
}

interface IErrorRemoveDispatchContext {
  (): void;
}

const ErrorStateContext = createContext<IErrorStateContext | undefined>(undefined);

const ErrorAddDispatchContext = createContext<IErrorAddDispatchContext | undefined>(undefined);

const ErrorRemoveDispatchContext = createContext<IErrorRemoveDispatchContext | undefined>(undefined);

const ErrorProvider: FC = ({ children }) => {
  const [error, setError] = useState<IErrorStateContext | null>(null);

  const addError = useCallback((message, historyBack) => {
    setError({ message, historyBack });
  }, []);

  const removeError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ErrorAddDispatchContext.Provider value={addError}>
      <ErrorRemoveDispatchContext.Provider value={removeError}>
        <ErrorStateContext.Provider value={error}>{children}</ErrorStateContext.Provider>
      </ErrorRemoveDispatchContext.Provider>
    </ErrorAddDispatchContext.Provider>
  );
};

const useErrorState = (): IErrorStateContext => {
  const context = useContext(ErrorStateContext);

  if (context === undefined) {
    throw new Error('useErrorState must be used within a ErrorStateProvider');
  }

  return context;
};

const useErrorAddDispatch = (): IErrorAddDispatchContext => {
  const context = useContext(ErrorAddDispatchContext);

  if (context === undefined) {
    throw new Error('useErrorAddDispatch must be used within a ErrorAddDispatchProvider');
  }

  return context;
};

const useErrorRemoveDispatch = (): IErrorRemoveDispatchContext => {
  const context = useContext(ErrorRemoveDispatchContext);

  if (context === undefined) {
    throw new Error('useErrorRemoveDispatch must be used within a ErrorRemoveDispatchProvider');
  }

  return context;
};

export { ErrorProvider, useErrorState, useErrorAddDispatch, useErrorRemoveDispatch };
