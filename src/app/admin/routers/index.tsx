import { Navigate } from 'react-router-dom';

import Login from '@admin/views/site/Login';

import DefaultLayout from '@admin/layouts/DefaultLayout';
import Home from '@admin/views/site/Home';
import About from '@admin/views/site/About';
import NotFound from '@admin/views/site/NotFound';

import adminRoutes from './admin/admin';
import adminGroupRoutes from './admin/adminGroup';
import userRoutes from './user/user';
import componentRoutes from './component/component';

const routes = [
  {
    path: '/login',
    element: <Login />,
  },
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
      ...adminRoutes,
      ...adminGroupRoutes,
      ...userRoutes,
      ...componentRoutes,
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export default routes;
