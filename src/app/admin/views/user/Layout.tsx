import { Link, Outlet } from 'react-router-dom';
import { FC } from 'react';

const UserLayout: FC = () => {
  return (
    <div className={'ag-box'}>
      <div>
        <nav>
          <li>
            <Link to="">UserIndex</Link>
          </li>
          <li>
            <Link to="create">UserCreate</Link>
          </li>
          <li>
            <Link to="edit/123">UserEdit 123</Link>
          </li>
          <li>
            <Link to="edit/132">UserEdit 132</Link>
          </li>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
