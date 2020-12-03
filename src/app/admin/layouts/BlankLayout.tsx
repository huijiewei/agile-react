import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const BlankLayout: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default BlankLayout;
