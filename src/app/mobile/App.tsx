import { useRoutes } from 'react-router-dom';

import useSplash from '@shared/hooks/useSplash';

import { SWRConfig } from 'swr';

import { FC } from 'react';
import routes from '@mobile/routers';

const App: FC = () => {
  useSplash();

  return (
    <SWRConfig
      value={{
        onError: (error) => {
          console.log(error);
        },
        shouldRetryOnError: false,
      }}
    >
      {useRoutes(routes, process.env.PUBLIC_URL)}
    </SWRConfig>
  );
};

export default App;
