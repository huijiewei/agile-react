import { Navigate } from 'react-router-dom';

import DefaultLayout from '@mobile/layouts/DefaultLayout';
import Home from '@mobile/views/site/Home';
import About from '@mobile/views/site/About';
import NotFound from '@mobile/views/site/NotFound';

const routes = [
  {
    path: '/',
    element: <DefaultLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="home" replace={true} />,
      },
      {
        path: 'home',
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
