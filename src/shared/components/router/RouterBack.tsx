import { useEffect } from 'react';
import { useBrowserHistory } from '@shared/components/router/BrowserRouter';

const RouterBack = (): null => {
  const browserHistory = useBrowserHistory();

  useEffect(() => {
    const unListen = browserHistory.listen(({ action, location }) => {
      console.log(action, location);
    });

    return () => unListen();
  }, [browserHistory]);

  return null;
};

export { RouterBack };
