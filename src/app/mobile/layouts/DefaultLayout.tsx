import { Link, Outlet } from 'react-router-dom';
import { FC, Suspense } from 'react';

const AgileHeader = (): JSX.Element => {
  return (
    <header className={'ag-header'}>
      <nav>
        <li>
          <Link to="home">Home</Link>
        </li>
        <li>
          <Link to="about">About</Link>
        </li>
        <li>
          <Link to="404">404</Link>
        </li>
      </nav>
    </header>
  );
};

const DefaultLayout = () => {
  console.log('DefaultLayout render');

  return (
    <div className={'ag-layout'}>
      <AgileHeader />
      <main className={'ag-content'}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};

export default DefaultLayout;
