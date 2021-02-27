import { BrowserRouter, useRoutes } from 'react-router-dom';

import useSplash from '@shared/hooks/useSplash';

import { FC } from 'react';
import routes from '@mobile/routers';
import { ErrorProvider } from '@shared/contexts/ErrorContext';

const AppRoutes: FC = () => {
  return useRoutes(routes, process.env.PUBLIC_URL);
};

const App: FC = () => {
  useSplash();

  return (
    <BrowserRouter>
      <ErrorProvider>
        <AppRoutes />
      </ErrorProvider>
    </BrowserRouter>
  );
};

export default App;
