import { Breadcrumbs, BreadcrumbsProps } from '@material-ui/core';
import { Link, matchRoutes, useLocation, useResolvedPath } from 'react-router-dom';
import { useMemo } from 'react';
import { getRouters } from '@admin/routers';

const HeaderBreadcrumb = (props: BreadcrumbsProps) => {
  const location = useLocation();

  const routes = useMemo(() => {
    return getRouters();
  }, []);

  const re = useResolvedPath(location);

  const match = matchRoutes(routes, location, process.env.PUBLIC_URL);

  console.log(location, re);
  console.log(match);

  return (
    <Breadcrumbs {...props}>
      <Link to={'home'}>管理后台</Link>
    </Breadcrumbs>
  );
};

export default HeaderBreadcrumb;
