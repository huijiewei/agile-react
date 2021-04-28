import { useEffect, useState } from 'react';
import { matchRoutes, Navigate, useLocation, useRoutes } from 'react-router-dom';
import { To } from 'history';

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

export const BASE_NAME = process.env.PUBLIC_URL;

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

type Breadcrumb = {
  title: string;
  current: boolean;
  to?: To;
};

const useBreadcrumb = (): Breadcrumb[] => {
  const location = useLocation();

  const [breadcrumbs, setBreadcrumbs] = useState<Breadcrumb[]>([]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const match = matchRoutes(routes, location, BASE_NAME);

    if (match) {
      const breadcrumbs: Breadcrumb[] = [];

      const matchLength = match.length - 1;

      match?.forEach((item, index) => {
        if (index > 0) {
          const current = index == matchLength;

          breadcrumbs.push({
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            title: item.route?.title,
            current: current,
            to: current ? undefined : BASE_NAME + item.pathname,
          });
        }
      });

      setBreadcrumbs(breadcrumbs);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  return breadcrumbs;
};

const AppRoutes = (): ReturnType<typeof useRoutes> => {
  return useRoutes(routes, BASE_NAME);
};

export { AppRoutes, useBreadcrumb };
