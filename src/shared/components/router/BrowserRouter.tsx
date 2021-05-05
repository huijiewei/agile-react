import { BrowserRouterProps, Router } from 'react-router-dom';
import { BrowserHistory, createBrowserHistory } from 'history';
import { createContext, useContext, useLayoutEffect, useState } from 'react';
import { useConst } from '@chakra-ui/react';

const HistoryContext = createContext<BrowserHistory | undefined>(undefined);

const BrowserRouter = ({ children, window }: BrowserRouterProps): JSX.Element => {
  const browserHistory = useConst(createBrowserHistory({ window }));

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
    throw new Error('useHistory must be used within a BrowserRouter');
  }

  return historyContext;
};

export { BrowserRouter, useHistory };
