import { BrowserRouter, useRoutes } from 'react-router-dom';

import { useSplash } from '@shared/hooks/useSplash';
import routes from '@mobile/routers';
import { ErrorProvider } from '@shared/contexts/ErrorContext';

const AppRoutes = () => {
  return useRoutes(routes);
};

const App = (): JSX.Element => {
  useSplash();

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <ErrorProvider>
        <AppRoutes />
      </ErrorProvider>
    </BrowserRouter>
  );
};

export default App;
