import React from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BlankLayout;
