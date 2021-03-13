import { createRoutesFromArray, Navigate, useRoutes } from 'react-router-dom';

import Login from '@admin/views/site/Login';

import DefaultLayout from '@admin/layouts/DefaultLayout';
import Home from '@admin/views/site/Home';
import About from '@admin/views/site/About';
import NotFound from '@admin/views/site/NotFound';

import adminRoutes from './admin/admin';
import adminGroupRoutes from './admin/adminGroup';
import userRoutes from './user/user';
import NextLayout from '@admin/views/nest/Layout';
import NestIndex from '@admin/views/nest';
import Nest1 from '@admin/views/nest/1';
import Nest2 from '@admin/views/nest/2';
import Nest11 from '@admin/views/nest/1-1';
import Nest12 from '@admin/views/nest/1-2';
import Nest111 from '@admin/views/nest/1-1-1';
import Nest112 from '@admin/views/nest/1-1-2';
import Nest1111 from '@admin/views/nest/1-1-1-1';
import Nest1112 from '@admin/views/nest/1-1-1-2';

const BASE_NAME = process.env.PUBLIC_URL;

const routes = [
  {
    path: '/login',
    title: '登录',
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
      {
        path: 'nest',
        element: <NextLayout />,
        children: [
          {
            path: '',
            element: <NestIndex />,
          },
          {
            path: '1',
            element: <Nest1 />,
            children: [
              {
                path: '1-1',
                element: <Nest11 />,
                children: [
                  {
                    path: '1-1-1',
                    element: <Nest111 />,
                    children: [
                      {
                        path: '1-1-1-1',
                        element: <Nest1111 />,
                      },
                      {
                        path: '1-1-1-2',
                        element: <Nest1112 />,
                      },
                    ],
                  },
                  {
                    path: '1-1-2',
                    element: <Nest112 />,
                  },
                ],
              },
              {
                path: '1-2',
                element: <Nest12 />,
              },
            ],
          },
          {
            path: '2',
            element: <Nest2 />,
          },
        ],
      },
      {
        path: '*',
        element: <NotFound />,
      },
    ],
  },
];

export const getRouters = () => {
  return createRoutesFromArray(routes);
};

const AppRoutes = () => {
  return useRoutes(routes, BASE_NAME);
};

export default AppRoutes;
