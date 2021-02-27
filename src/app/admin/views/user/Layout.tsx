import { Link, Outlet } from 'react-router-dom';
import { VFC } from 'react';

const UserLayout: VFC = () => {
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
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;
