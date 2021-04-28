import { lazy } from 'react';

const NestLayout = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/Layout'));
const NestIndex = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/Index'));
const Nest1 = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/1'));
const Nest2 = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/2'));
const Nest11 = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/1-1'));
const Nest12 = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/1-2'));
const Nest111 = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/1-1-1'));
const Nest112 = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/1-1-2'));
const Nest1111 = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/1-1-1-1'));
const Nest1112 = lazy(() => import(/* webpackChunkName: "chunk-nest" */ '@admin/views/nest/1-1-1-2'));

const nestRouters = [
  {
    path: 'nest',
    title: 'nest',
    element: <NestLayout />,
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
];

export { nestRouters };
