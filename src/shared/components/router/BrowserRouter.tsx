import { BrowserRouterProps, Router } from 'react-router-dom';
import { BrowserHistory, createBrowserHistory } from 'history';
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';

const HistoryContext = createContext<BrowserHistory | undefined>(undefined);

const BrowserRouter = ({ children, window }: BrowserRouterProps): JSX.Element => {
  const historyRef = useRef<BrowserHistory>();

  if (historyRef.current == null) {
    historyRef.current = createBrowserHistory({ window });
  }

  const history = historyRef.current;

  const [state, setState] = useState({
    action: history.action,
    location: history.location,
  });

  useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router action={state.action} location={state.location} navigator={history}>
      <HistoryContext.Provider value={history}>{children}</HistoryContext.Provider>
    </Router>
  );
};

const useHistory = (): BrowserHistory => {
  const context = useContext(HistoryContext);

  if (context === undefined) {
    throw new Error('useHistory must be used within a BrowserRouter');
  }

  return context;
};

export { BrowserRouter, useHistory };
