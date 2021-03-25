import { Outlet } from 'react-router-dom';
import { Suspense } from 'react';
import AgileHeader from '@admin/layouts/AgileHeader';
import AgileAside from '@admin/layouts/AgileAside';
import { AuthLogin } from '@admin/components/AuthLogin';

const DefaultLayout = () => {
  console.log('DefaultLayout Render');

  return (
    <AuthLogin>
      <div>
        <AgileHeader />
        <AgileAside />
        <div style={{ marginLeft: 200 }}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </AuthLogin>
  );
};

export default DefaultLayout;
