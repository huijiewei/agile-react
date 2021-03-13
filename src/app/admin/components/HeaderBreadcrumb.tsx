import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbProps, Icon } from '@chakra-ui/react';
import { Link, matchRoutes, useLocation, useResolvedPath } from 'react-router-dom';
import { useMemo } from 'react';
import { getRouters } from '@admin/routers';
import { Home } from 'react-feather';

const HeaderBreadcrumb = (props: BreadcrumbProps) => {
  const location = useLocation();

  const routes = useMemo(() => {
    return getRouters();
  }, []);

  const re = useResolvedPath(location);

  const match = matchRoutes(routes, location, process.env.PUBLIC_URL);

  console.log(location, re);
  console.log(match);

  return (
    <Breadcrumb {...props}>
      <BreadcrumbItem>
        <Link to={'home'}>
          <Icon marginTop={'-3px'} marginRight={'3px'} as={Home} />
          管理后台
        </Link>
      </BreadcrumbItem>

      <BreadcrumbItem>
        <BreadcrumbLink href="#">Docs</BreadcrumbLink>
      </BreadcrumbItem>

      <BreadcrumbItem isCurrentPage>
        <BreadcrumbLink href="#">Breadcrumb</BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export default HeaderBreadcrumb;
