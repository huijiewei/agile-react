import { useRoutes } from 'react-router-dom';

import useSplash from '@shared/hooks/useSplash';

import '@admin/assets/styles/admin.base.css';
import '@admin/assets/styles/admin.components.css';
import '@admin/assets/styles/admin.utilities.css';

import routes from '@admin/routers';
import { FC } from 'react';

const App: FC = () => {
  useSplash();

  return useRoutes(routes, process.env.PUBLIC_URL);
};

export default App;
