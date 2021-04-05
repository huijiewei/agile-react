import { lazy } from 'react';

const UserIndex = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Index'));
const UserCreate = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Create'));
const UserEdit = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Edit'));

const userRoutes = [
  {
    path: 'user',
    children: [
      {
        path: '',
        title: '用户列表',
        element: <UserIndex />,
      },
      {
        path: 'create',
        title: '用户新建',
        element: <UserCreate />,
      },
      {
        path: 'edit/:id',
        title: '用户编辑',
        element: <UserEdit />,
      },
    ],
  },
];

export { userRoutes };
