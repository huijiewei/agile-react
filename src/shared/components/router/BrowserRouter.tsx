import { BrowserRouterProps, Router } from 'react-router-dom';
import { BrowserHistory, createBrowserHistory } from 'history';
import { createContext, useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';

const BrowserHistoryContext = createContext<BrowserHistory | undefined>(undefined);

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

  useEffect(() => {
    const unListen = history.listen(setState);

    return () => unListen();
  }, [history]);

  return (
    <Router action={state.action} location={state.location} navigator={history}>
      <BrowserHistoryContext.Provider value={history}>{children}</BrowserHistoryContext.Provider>
    </Router>
  );
};

const useBrowserHistory = (): BrowserHistory => {
  const context = useContext(BrowserHistoryContext);

  if (context === undefined) {
    throw new Error('useBrowserHistory must be used within a BrowserRouter');
  }

  return context;
};

export { BrowserRouter, useBrowserHistory };
