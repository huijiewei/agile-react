import { BrowserRouter, useRoutes } from 'react-router-dom';

import { useSplash } from '@shared/hooks/useSplash';
import routes from '@mobile/routers';
import { ErrorProvider } from '@shared/contexts/ErrorContext';

const AppRoutes = () => {
  return useRoutes(routes, process.env.PUBLIC_URL);
};

const App = () => {
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
