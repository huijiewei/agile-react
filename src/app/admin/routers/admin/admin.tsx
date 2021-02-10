import { lazy } from 'react';

const AdminIndex = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin/Index'));

const adminRoutes = [
  {
    path: '/admin',
    element: <AdminIndex />,
  },
];

export default adminRoutes;
