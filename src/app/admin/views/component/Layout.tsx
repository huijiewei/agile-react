import { Link, Outlet } from 'react-router-dom';
import ContentLayout from '@admin/layouts/ContentLayout';

const ComponentLayout = (): JSX.Element => {
  return (
    <ContentLayout>
      <div>
        <Link to={'/component'}>组件</Link>
        &nbsp;&nbsp;
        <Link to={'/component/button'}>按钮</Link>
        &nbsp;&nbsp;
        <Link to={'/component/upload'}>上传</Link>
      </div>
      <Outlet />
    </ContentLayout>
  );
};

export default ComponentLayout;
