import { lazy } from 'react';

const AdminGroupIndex = lazy(() => import(/* webpackChunkName: "chunk-admin" */ '@admin/views/admin-group/Index'));

const adminGroupRoutes = [
  {
    path: '/admin-group',
    element: <AdminGroupIndex />,
  },
];

export default adminGroupRoutes;
