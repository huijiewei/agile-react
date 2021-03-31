import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import AgileHeader from '@admin/layouts/AgileHeader';
import AgileAside from '@admin/layouts/AgileAside';
import { AuthLogin } from '@admin/components/AuthLogin';
import { Layout, LayoutAside, LayoutContent, LayoutHeader } from '@shared/components/layout/Layout';

const DefaultLayout = () => {
  console.log('DefaultLayout Render');

  return (
    <AuthLogin>
      <Layout
        backgroundColor="gray.50"
        headerHeight="50px"
        headerBackgroundColor="white"
        asideWidth="220px"
        asideCollapsedWidth="60px"
        asideBackgroundColor="gray.700"
      >
        <LayoutHeader>
          <AgileHeader />
        </LayoutHeader>
        <LayoutAside>
          <AgileAside />
        </LayoutAside>
        <LayoutContent>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </LayoutContent>
      </Layout>
    </AuthLogin>
  );
};

export default DefaultLayout;
