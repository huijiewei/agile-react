import { useRoutes } from 'react-router-dom';

import useSplash from '@shared/hooks/useSplash';

import '@admin/assets/styles/admin.base.css';
import '@admin/assets/styles/admin.components.css';
import '@admin/assets/styles/admin.utilities.css';

import routes from '@admin/routers';
import { SWRConfig } from 'swr';

const App = (): JSX.Element => {
  useSplash();

  const agileRoutes = useRoutes(routes, process.env.PUBLIC_URL);

  return (
    <SWRConfig
      value={{
        shouldRetryOnError: false,
        onError: (error, key) => {
          console.log(error, key);
        },
      }}
    >
      {agileRoutes}
    </SWRConfig>
  );
};

export default App;
