import { lazy } from 'react';

const ComponentLayout = lazy(() => import(/* webpackChunkName: "chunk-component" */ '@admin/views/component/Layout'));
const ComponentIndex = lazy(() => import(/* webpackChunkName: "chunk-component" */ '@admin/views/component/Index'));
const ComponentButton = lazy(() => import(/* webpackChunkName: "chunk-component" */ '@admin/views/component/Button'));
const ComponentUpload = lazy(() => import(/* webpackChunkName: "chunk-component" */ '@admin/views/component/Upload'));

const componentRouters = [
  {
    path: 'component',
    title: '组件',
    element: <ComponentLayout />,
    children: [
      {
        path: '',
        title: '索引',
        element: <ComponentIndex />,
      },
      {
        path: 'button',
        title: '按钮',
        element: <ComponentButton />,
      },
      {
        path: 'upload',
        title: '上传',
        element: <ComponentUpload />,
      },
    ],
  },
];

export { componentRouters };
