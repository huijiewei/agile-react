import { matchRoutes, Navigate, useLocation, useRoutes } from 'react-router-dom';
import { To } from 'history';

import { adminRoutes } from './admin/admin';
import { adminGroupRoutes } from './admin/admin-group';
import { adminLogRoutes } from './admin/admin-log';
import { userRoutes } from './user/user';

import Login from '@admin/views/site/Login';

import DefaultLayout from '@admin/layouts/DefaultLayout';
import Home from '@admin/views/site/Home';
import NotFound from '@admin/views/site/NotFound';

import NextLayout from '@admin/views/nest/Layout';
import NestIndex from '@admin/views/nest/Index';
import Nest1 from '@admin/views/nest/1';
import Nest2 from '@admin/views/nest/2';
import Nest11 from '@admin/views/nest/1-1';
import Nest12 from '@admin/views/nest/1-2';
import Nest111 from '@admin/views/nest/1-1-1';
import Nest112 from '@admin/views/nest/1-1-2';
import Nest1111 from '@admin/views/nest/1-1-1-1';
import Nest1112 from '@admin/views/nest/1-1-1-2';
import { useEffect, useState } from 'react';

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
      {
        path: 'nest',
        title: 'nest',
        element: <NextLayout />,
        children: [
          {
            path: '',
            title: 'index',
            element: <NestIndex />,
          },
          {
            path: '1',
            title: 'next-1',
            element: <Nest1 />,
            children: [
              {
                path: '1-1',
                title: 'next-1-1',
                element: <Nest11 />,
                children: [
                  {
                    path: '1-1-1',
                    title: 'next-1-1-1',
                    element: <Nest111 />,
                    children: [
                      {
                        path: '1-1-1-1',
                        title: 'next-1-1-1-1',
                        element: <Nest1111 />,
                      },
                      {
                        path: '1-1-1-2',
                        title: 'next-1-1-1-2',
                        element: <Nest1112 />,
                      },
                    ],
                  },
                  {
                    path: '1-1-2',
                    title: 'next-1-1-2',
                    element: <Nest112 />,
                  },
                ],
              },
              {
                path: '1-2',
                title: 'next-1-2',
                element: <Nest12 />,
              },
            ],
          },
          {
            path: '2',
            title: 'next-2',
            element: <Nest2 />,
          },
        ],
      },
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

const useBreadcrumb = () => {
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
            title: item.route.title,
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

const AppRoutes = () => {
  return useRoutes(routes, BASE_NAME);
};

export { AppRoutes, useBreadcrumb };
