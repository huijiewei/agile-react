import { NavLink, Link, Navigate, Outlet } from 'react-router-dom';
import { FC, useEffect, Suspense } from 'react';
import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import { useGet } from '@shared/contexts/HttpContext';
import { IAccount, useAuthUserDispatch, useAuthUserState } from '@admin/contexts/AuthUserContext';

const formatUrl = (url) => {
  if (url === 'site/index') {
    return 'home';
  }

  if (url.endsWith('/index')) {
    return url.substr(0, url.length - 6);
  }

  return url;
};

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
  const { menus } = useAuthUserState();
  //const menus = [];

  return (
    <div className={'ag-side'}>
      <div className={'ag-brand'}>
        <img alt="Agile" src={require('../assets/images/logo.png')} />
        <img alt="Boilerplate" src={require('../assets/images/banner-white.png')} />
      </div>
      <div className={'ag-scroll'}>
        <nav>
          {menus.map((menu, idx) => (
            <li key={'menu-' + idx}>
              {menu.url ? (
                <NavLink activeClassName={'activated'} to={formatUrl(menu.url)}>
                  {menu.label}
                </NavLink>
              ) : (
                <>
                  <span>{menu.label}</span>
                  {menu.children && (
                    <ul>
                      {menu.children.map((subMenu, subIdx) => (
                        <li key={'menu-' + idx + subIdx}>
                          {subMenu.url ? (
                            <NavLink activeClassName={'activated'} to={formatUrl(subMenu.url)}>
                              {subMenu.label}
                            </NavLink>
                          ) : (
                            <>
                              <span>{menu.label}</span>
                              {menu.children && (
                                <ul>
                                  {menu.children.map((subMenu, subIdx) => (
                                    <li key={'menu-' + idx + subIdx}>
                                      {subMenu.url ? (
                                        <NavLink activeClassName={'activated'} to={formatUrl(subMenu.url)}>
                                          {subMenu.label}
                                        </NavLink>
                                      ) : null}
                                    </li>
                                  ))}
                                </ul>
                              )}
                            </>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </>
              )}
            </li>
          ))}
        </nav>
      </div>
    </div>
  );
};

const DefaultLayout: FC = () => {
  const setAuthUser = useAuthUserDispatch();
  const authLoginAction = useAuthLoginState();
  const { data } = useGet<IAccount>('auth/account', null, null, false);

  useEffect(() => {
    if (data) {
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);
    }
  }, [data, setAuthUser]);

  console.log('DefaultLayout Render');

  return authLoginAction == AuthLoginAction.DIRECT ? (
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
