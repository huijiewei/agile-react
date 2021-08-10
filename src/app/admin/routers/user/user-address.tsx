import { lazy } from 'react';

const UserAddressIndex = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user-address/Index'));
const UserAddressEdit = lazy(() => import(/* webpackChunkName: "chunk-user" */ '@admin/views/user-address/Edit'));

const userAddressRoutes = [
  {
    path: 'user-address',
    title: '用户地址',
    children: [
      {
        path: '',
        title: '列表',
        element: <UserAddressIndex />,
      },
      {
        path: 'edit/:id',
        title: '编辑',
        element: <UserAddressEdit />,
      },
    ],
  },
];

export { userAddressRoutes };
