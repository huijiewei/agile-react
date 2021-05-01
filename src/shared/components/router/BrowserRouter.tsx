import { BrowserRouterProps, Router } from 'react-router-dom';
import { BrowserHistory, createBrowserHistory, State, To } from 'history';
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';
import { computeScrollPosition, saveScrollPosition } from '@shared/components/router/RouterScroll';

const HistoryContext = createContext<BrowserHistory | undefined>(undefined);

const BrowserRouter = ({ children, window }: BrowserRouterProps): JSX.Element => {
  const historyRef = useRef<BrowserHistory>();

  if (historyRef.current == null) {
    const primitiveHistory = createBrowserHistory({ window });

    historyRef.current = {
      ...primitiveHistory,
      ...{
        push(to: To, state?: State | undefined) {
          saveScrollPosition(primitiveHistory.createHref(primitiveHistory.location), computeScrollPosition());

          primitiveHistory.push(to, state);
        },
        replace(to: To, state?: State | undefined) {
          primitiveHistory.replace(to, state);
        },
      },
    };
  }

  const browserHistory = historyRef.current;

  const [state, setState] = useState({
    action: browserHistory.action,
    location: browserHistory.location,
  });

  useLayoutEffect(() => {
    const removeHistoryListener = browserHistory.listen(({ action, location }) => {
      setState({ action, location });
    });

    return () => removeHistoryListener();
  }, [browserHistory]);

  return (
    <Router action={state.action} location={state.location} navigator={browserHistory}>
      <HistoryContext.Provider value={browserHistory}>{children}</HistoryContext.Provider>
    </Router>
  );
};

const useHistory = (): BrowserHistory => {
  const historyContext = useContext(HistoryContext);

  if (historyContext === undefined) {
    throw new Error('useBrowserHistory must be used within a BrowserRouter');
  }

  return historyContext;
};

export { BrowserRouter, useHistory };
