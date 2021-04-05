import { lazy } from 'react';

const AdminGroupIndex = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin-group/Index'));
const AdminGroupCreate = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin-group/Create'));
const AdminGroupEdit = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin-group/Edit'));

const adminGroupRoutes = [
  {
    path: 'admin-group',
    children: [
      {
        path: '',
        title: '管理组列表',
        element: <AdminGroupIndex />,
      },
      {
        path: 'create',
        title: '管理组新建',
        element: <AdminGroupCreate />,
      },
      {
        path: 'edit/:id',
        title: '管理组编辑',
        element: <AdminGroupEdit />,
      },
    ],
  },
];

export { adminGroupRoutes };
