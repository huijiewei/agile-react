import { Link, Outlet } from 'react-router-dom';
import { FC, Suspense, useEffect } from 'react';

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
            <Link to="home">Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="user">User</Link>
          </li>
          <li>
            <Link to="admin">Admin</Link>
          </li>
          <li>
            <Link to="admin-group">AdminGroup</Link>
          </li>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="404">404</Link>
          </li>
        </nav>
      </div>
    </div>
  );
};

const DefaultLayout: FC = () => {
  console.log('DefaultLayout init');

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
