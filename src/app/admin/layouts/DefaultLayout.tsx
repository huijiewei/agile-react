import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import { AuthLogin } from '@admin/components/AuthLogin';
import { Layout, LayoutAside, LayoutContent, LayoutHeader } from '@shared/components/layout/Layout';
import { NavHeader } from '@admin/components/NavHeader';
import { NavAside } from '@admin/components/NavAside';

const DefaultLayout = (): JSX.Element => {
  return (
    <AuthLogin>
      <Layout
        backgroundColor="gray.50"
        headerHeight="50px"
        headerBackgroundColor="white"
        asideWidth="220px"
        asideColor="gray.50"
        asideCollapsedWidth="60px"
        asideBackgroundColor="gray.700"
      >
        <LayoutHeader>
          <NavHeader />
        </LayoutHeader>
        <LayoutAside>
          <NavAside />
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
