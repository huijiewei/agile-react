import { Navigate, NavLink, Outlet } from 'react-router-dom';
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

const AgileSide: VFC = () => {
  const menus = [
    {
      url: 'home',
      label: '主页',
    },
    {
      url: 'about',
      label: '关于',
    },
    {
      url: 'admin',
      label: '管理员',
    },
    {
      url: 'admin-group',
      label: '管理组',
    },
    {
      url: 'user',
      label: '用户',
    },
    {
      url: 'component',
      label: '组件',
    },
    {
      url: '404',
      label: '404',
    },
  ];

  return (
    <aside className="">
      <nav className="list-none">
        {menus.map((menu, index) => (
          <li key={'m-' + index} className="leading-8">
            <NavLink className="font-medium" to={menu.url}>
              {menu.label}
            </NavLink>
          </li>
        ))}
      </nav>
    </aside>
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
      <AgileSide />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default DefaultLayout;
