import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const DefaultLayout = (): JSX.Element => {
  return (
    <section>
      <h1>Welcome to the Agile!</h1>
      <nav>
        <Link to="home">Home</Link>
        <Link to="about">About</Link>
        <Link to="404">404</Link>
      </nav>
      <div>
        <Outlet />
      </div>
    </section>
  );
};

export default DefaultLayout;
