import { lazy } from 'react';

const AdminIndex = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin/Index'));
const AdminCreate = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin/Create'));
const AdminEdit = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin/Edit'));

const adminRoutes = [
  {
    path: 'admin',
    title: '管理员',
    children: [
      {
        index: true,
        title: '列表',
        element: <AdminIndex />,
      },
      {
        path: 'create',
        title: '新建',
        element: <AdminCreate />,
      },
      {
        path: 'edit/:id',
        title: '编辑',
        element: <AdminEdit />,
      },
    ],
  },
];

export { adminRoutes };
