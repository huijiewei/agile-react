import { Link, Navigate, NavLink, Outlet } from 'react-router-dom';
import { Suspense, useEffect, VFC } from 'react';
import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import useRefreshUser from '@admin/hooks/useRefreshUser';
import { noScrollbarsClassName } from 'react-remove-scroll-bar';
import clsx from 'clsx';
import CustomScroll from 'react-custom-scroll';

import '../assets/styles/default-layout.css';
import '../assets/styles/custom-scroll.css';

const AgileHead: VFC = () => {
  const _classNames = clsx('ag-header fixed w-full', noScrollbarsClassName);

  return (
    <header className={_classNames}>
      <div className="ag-header-nav flex flex-row justify-between">
        <p>BEGIN</p>
        <p>END</p>
      </div>
      <div className="ag-header-tab flex flex-row justify-between">
        <p>BEGIN</p>
        <p>END</p>
      </div>
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
    <aside className="ag-aside fixed h-screen">
      <div className="ag-brand">
        <Link to={'home'}>
          <img alt="Agile" src={require('../assets/images/logo.png')} />
          <img alt="Boilerplate" src={require('../assets/images/banner-white.png')} />
        </Link>
      </div>
      <CustomScroll heightRelativeToParent="calc(100% - 50px)">
        <nav className="list-none">
          {menus.map((menu, index) => (
            <li key={'m-' + index} className="leading-8">
              <NavLink className="font-medium" to={menu.url}>
                {menu.label}
              </NavLink>
            </li>
          ))}
          {[
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29,
            30,
            31,
            32,
            33,
            34,
            35,
          ].map((item) => (
            <li key={'ms-' + item}>搞出滚动条{item}</li>
          ))}
        </nav>
      </CustomScroll>
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
    <div className="ag-layout flex flex-row relative min-h-screen flex-grow">
      <AgileHead />
      <AgileSide />
      <main className="ag-main">
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default DefaultLayout;
