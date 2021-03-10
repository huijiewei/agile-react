import { Navigate, Outlet } from 'react-router-dom';
import { Suspense, useEffect, VFC } from 'react';
import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import useRefreshUser from '@admin/hooks/useRefreshUser';

const drawerWidth = '220px';
const headerHeight = '60px';

const AgileHead: VFC = () => {
  return (
    <header
      className="fixed w-full"
      style={{
        height: headerHeight,
        width: `calc(100% - ${drawerWidth})`,
        marginLeft: drawerWidth,
        boxShadow: 0,
      }}
    >
      <p>1</p>
    </header>
  );
};

const DefaultLayout: VFC = () => {
  const refreshUser = useRefreshUser();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const authLoginAction = useAuthLoginState();

  console.log('DefaultLayout Render');

  return authLoginAction == AuthLoginAction.DIRECT ? (
    <Navigate to={'login'} replace={true} />
  ) : (
    <div className="flex flex-row relative min-h-full flex-grow">
      <AgileHead />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default DefaultLayout;
