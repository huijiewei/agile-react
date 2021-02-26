import { NavLink, Link, Navigate, Outlet } from 'react-router-dom';
import { FC, useEffect, Suspense } from 'react';
import { LoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import { useGet } from '@shared/contexts/HttpContext';
import { IAccount, useAuthUserSetDispatch } from '@admin/contexts/AuthUserContext';

const AgileHeader: FC = () => {
  return (
    <header className={'ag-header'}>
      <nav className={'ag-nav'}>
        <div className={'ag-left'}>1</div>
      </nav>
      <div className={'ag-tabs'}>
        <ul>
          <li>Tab 1</li>
          <li>Tab 2</li>
          <li>Tab 3</li>
          <li>Tab 4</li>
          <li>Tab 5</li>
          <li>Tab 6</li>
        </ul>
      </div>
    </header>
  );
};

const AgileSide: FC = () => {
  //const { menus } = useAuthIdentState();
  const menus = [];

  return (
    <div className={'ag-side'}>
      <div className={'ag-brand'}>
        <img alt="Agile" src={require('../assets/images/logo.png')} />
        <img alt="Boilerplate" src={require('../assets/images/banner-white.png')} />
      </div>
      <div className={'ag-scroll'}>
        <nav>
          {menus.map((menu, idx) => {
            return (
              <NavLink key={'menu-' + idx} activeClassName={'activated'} to={menu.url}>
                {menu.label}
              </NavLink>
            );
          })}
          <li>
            <NavLink activeClassName={'activated'} to="home">
              Home
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={'activated'} to="about">
              About
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={'activated'} to="user">
              User
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={'activated'} to="admin">
              Admin
            </NavLink>
          </li>
          <li>
            <NavLink activeClassName={'activated'} to="admin-group">
              AdminGroup
            </NavLink>
          </li>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <NavLink activeClassName={'activated'} to="404">
              404
            </NavLink>
          </li>
        </nav>
      </div>
    </div>
  );
};

const DefaultLayout: FC = () => {
  const setAuthUser = useAuthUserSetDispatch();
  const authLoginAction = useAuthLoginState();
  const { data } = useGet<IAccount>('auth/account', null, null, false);

  useEffect(() => {
    if (data) {
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);
    }
  }, [data, setAuthUser]);

  return authLoginAction == LoginAction.DIRECT ? (
    <Navigate to={'login'} replace={true} />
  ) : (
    <div className={'ag-layout'}>
      <AgileSide />
      <div className={'ag-main'}>
        <AgileHeader />
        <main className={'ag-content'}>
          <Suspense fallback={null}>
            <Outlet />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default DefaultLayout;
