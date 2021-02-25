import { FC } from 'react';
import { BrowserRouter, useRoutes } from 'react-router-dom';

import useSplash from '@shared/hooks/useSplash';

import { ErrorProvider } from '@shared/contexts/ErrorContext';
import ErrorDialog from '@admin/components/ErrorDialog';

import routes from '@admin/routers';

import { AppAuthProvider } from '@admin/AppAuthProvider';
import { AppHttpProvider } from '@admin/AppHttpProvider';

const AppRoutes: FC = () => {
  return useRoutes(routes, process.env.PUBLIC_URL);
};

const App: FC = () => {
  useSplash();

  return (
    <BrowserRouter>
      <ErrorProvider>
        <AppAuthProvider>
          <AppHttpProvider>
            <AppRoutes />
          </AppHttpProvider>
        </AppAuthProvider>
        <ErrorDialog />
      </ErrorProvider>
    </BrowserRouter>
  );
};

export default App;
