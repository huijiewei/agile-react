import { lazy } from 'react';

const UserLayout = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Layout'));
const UserIndex = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Index'));
const UserCreate = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Create'));
const UserEdit = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Edit'));

const userRoutes = [
  {
    path: 'user',
    element: <UserLayout />,
    children: [
      {
        path: '',
        element: <UserIndex />,
      },
      {
        path: 'create',
        element: <UserCreate />,
      },
      {
        path: 'edit/:id',
        element: <UserEdit />,
      },
    ],
  },
];

export default userRoutes;