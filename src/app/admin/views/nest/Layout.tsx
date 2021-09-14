import { Link, Outlet } from 'react-router-dom';
import ContentLayout from '@admin/layouts/ContentLayout';

const NestLayout = (): JSX.Element => {
  return (
    <ContentLayout>
      <div>
        <Link to={'/nest'}>Nest</Link>
        &nbsp;&nbsp;
        <Link to={'1'}>Nest-1</Link>
        &nbsp;&nbsp;
        <Link to={'2'}>Nest-2</Link>
      </div>
      <Outlet />
    </ContentLayout>
  );
};

export default NestLayout;
