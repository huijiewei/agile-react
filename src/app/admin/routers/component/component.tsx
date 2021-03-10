import { lazy } from 'react';

const ComponentLayout = lazy(() => import(/* webpackChunkName: "chunk-component" */ '@admin/views/component/Layout'));
const ComponentIndex = lazy(() => import(/* webpackChunkName: "chunk-component" */ '@admin/views/component/Index'));
const ComponentButton = lazy(
  () => import(/* webpackChunkName: "chunk-component" */ '@admin/views/component/demo/Button')
);

const componentRoutes = [
  {
    path: 'component',
    element: <ComponentLayout />,
    children: [
      {
        path: '',
        element: <ComponentIndex />,
      },
      {
        path: 'button',
        element: <ComponentButton />,
      },
    ],
  },
];

export default componentRoutes;
