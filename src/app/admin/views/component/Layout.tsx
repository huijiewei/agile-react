import { NavLink, Outlet } from 'react-router-dom';
import { VFC } from 'react';

const ComponentLayout: VFC = () => {
  return (
    <div className={'ag-box'}>
      <div>
        <nav>
          <li>
            <NavLink to="">组件</NavLink>
          </li>
          <li>
            <NavLink to="button">按钮</NavLink>
          </li>
        </nav>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default ComponentLayout;
