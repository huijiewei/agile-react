import { BrowserRouter, useRoutes } from 'react-router-dom';

import useSplash from '@shared/hooks/useSplash';

import { FC } from 'react';
import routes from '@mobile/routers';
import { ErrorProvider } from '@shared/contexts/ErrorContext';

const App: FC = () => {
  useSplash();

  return (
    <BrowserRouter>
      <ErrorProvider>{useRoutes(routes, process.env.PUBLIC_URL)}</ErrorProvider>
    </BrowserRouter>
  );
};

export default App;
