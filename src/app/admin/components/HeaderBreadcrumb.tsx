import { Link, matchRoutes, useLocation } from 'react-router-dom';
import { HTMLAttributes, useMemo } from 'react';
import { getRouters } from '@admin/routers';

const HeaderBreadcrumb = (props: HTMLAttributes<HTMLDivElement>) => {
  const location = useLocation();

  const routes = useMemo(() => {
    return getRouters();
  }, []);

  const match = matchRoutes(routes, location, process.env.PUBLIC_URL);

  console.log(match);

  return (
    <div {...props}>
      <Link to={'home'}>管理后台</Link>
    </div>
  );
};

export { HeaderBreadcrumb };
