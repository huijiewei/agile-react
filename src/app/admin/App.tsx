import { useSplash } from '@shared/hooks/useSplash';

import { ErrorProvider } from '@shared/contexts/ErrorContext';
import { ErrorDialog } from '@admin/components/ErrorDialog';

import { AppAuthProvider } from '@admin/AppAuth';
import { AppHttpProvider } from '@admin/AppHttp';

import { AppRoutes } from '@admin/routers';
import { RouterScroll } from '@shared/components/router/RouterScroll';
import { BrowserRouter } from '@shared/components/router/BrowserRouter';

const App = (): JSX.Element => {
  useSplash();

  return (
    <BrowserRouter>
      <RouterScroll />
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

export { App };
