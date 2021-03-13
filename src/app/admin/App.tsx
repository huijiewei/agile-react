import { BrowserRouter } from 'react-router-dom';

import { useSplash } from '@shared/hooks/useSplash';

import { ErrorProvider } from '@shared/contexts/ErrorContext';
import ErrorDialog from '@admin/components/ErrorDialog';

import { AppAuthProvider } from '@admin/AppAuth';
import { AppHttpProvider } from '@admin/AppHttp';

import AppRoutes from '@admin/routers';

const App = () => {
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
