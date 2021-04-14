import { lazy } from 'react';

const AdminGroupIndex = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin-group/Index'));
const AdminGroupCreate = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin-group/Create'));
const AdminGroupEdit = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin-group/Edit'));

const adminGroupRoutes = [
  {
    path: 'admin-group',
    title: '管理组',
    children: [
      {
        path: '',
        title: '列表',
        element: <AdminGroupIndex />,
      },
      {
        path: 'create',
        title: '新建',
        element: <AdminGroupCreate />,
      },
      {
        path: 'edit/:id',
        title: '编辑',
        element: <AdminGroupEdit />,
      },
    ],
  },
];

export { adminGroupRoutes };
