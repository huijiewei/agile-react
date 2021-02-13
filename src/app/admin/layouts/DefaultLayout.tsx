import { Link, NavLink, Outlet } from 'react-router-dom';
import { FC, Suspense, useEffect } from 'react';
import useHttp from '@shared/hooks/useHttp';

const AgileHeader = (): JSX.Element => {
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

const AgileSide = (): JSX.Element => {
  return (
    <div className={'ag-side'}>
      <div className={'ag-brand'}>
        <img alt="Agile" src={require('../assets/images/logo.png')} />
        <img alt="Boilerplate" src={require('../assets/images/banner-white.png')} />
      </div>
      <div className={'ag-scroll'}>
        <nav>
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
  const { data, error } = useHttp('GET', 'auth/account');

  console.log(data, error);

  useEffect(() => {
    console.log('DefaultLayout render');
  }, []);

  return (
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
