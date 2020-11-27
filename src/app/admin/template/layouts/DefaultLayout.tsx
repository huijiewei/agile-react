import React from 'react';
import { Outlet } from 'react-router-dom';

const DefaultLayout = (): JSX.Element => {
  return (
    <section>
      <Outlet />
    </section>
  );
};

export default DefaultLayout;
