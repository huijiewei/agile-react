import { useRoutes } from 'react-router-dom';

import useSplash from '@shared/hooks/useSplash';

import ErrorDialog from '@admin/components/ErrorDialog';
import ErrorProvider from '@shared/providers/ErrorProvider';

import '@shared/assets/styles/agile.less';
import '@admin/assets/styles/admin.less';

import routes from '@admin/routers';

const App = (): JSX.Element => {
  useSplash();

  const agileRoutes = useRoutes(routes, process.env.PUBLIC_URL);

  return (
    <ErrorProvider>
      {agileRoutes}
      <ErrorDialog />
    </ErrorProvider>
  );
};

export default App;
