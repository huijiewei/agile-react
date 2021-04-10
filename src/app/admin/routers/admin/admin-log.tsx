import { lazy } from 'react';

const AdminLogIndex = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin-log/Index'));

const adminLogRoutes = [
  {
    path: 'admin-log',
    title: '操作日志',
    element: <AdminLogIndex />,
  },
];

export { adminLogRoutes };
