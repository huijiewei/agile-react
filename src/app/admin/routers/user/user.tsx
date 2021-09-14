import { lazy } from 'react';

const UserIndex = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Index'));
const UserCreate = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Create'));
const UserEdit = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user/Edit'));

const userRoutes = [
  {
    path: 'user',
    title: '用户',
    children: [
      {
        index: true,
        title: '列表',
        element: <UserIndex />,
      },
      {
        path: 'create',
        title: '新建',
        element: <UserCreate />,
      },
      {
        path: 'edit/:id',
        title: '编辑',
        element: <UserEdit />,
      },
    ],
  },
];

export { userRoutes };
