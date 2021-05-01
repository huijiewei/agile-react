import { matchRoutes, Navigate, useRoutes } from 'react-router-dom';
import { Location, To } from 'history';

import { adminRoutes } from './admin/admin';
import { adminGroupRoutes } from './admin/admin-group';
import { adminLogRoutes } from './admin/admin-log';
import { userRoutes } from './user/user';
import { nestRouters } from '@admin/routers/component/nest';
import { componentRouters } from '@admin/routers/component/component';

import DefaultLayout from '@admin/layouts/DefaultLayout';

import Home from '@admin/views/site/Home';
import Login from '@admin/views/site/Login';
import NotFound from '@admin/views/site/NotFound';

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
        title: '首页',
        element: <Home />,
      },
      ...adminRoutes,
      ...adminGroupRoutes,
      ...adminLogRoutes,
      ...userRoutes,
      ...nestRouters,
      ...componentRouters,
      {
        path: '*',
        title: '页面不存在',
        element: <NotFound />,
      },
    ],
  },
];

const AppRoutes = (): ReturnType<typeof useRoutes> => {
  return useRoutes(routes, BASE_NAME);
};

type RouteMatch = {
  to: To;
  title?: string;
};

const getMatchRoutes = (location: Location): RouteMatch[] => {
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    matchRoutes(routes, location, BASE_NAME)
      ?.filter((match) => match.route.path != '/')
      .map((match) => {
        return {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          title: match.route?.title,
          to: BASE_NAME + match.pathname,
        };
      }) ?? []
  );
};

export { AppRoutes, getMatchRoutes };
