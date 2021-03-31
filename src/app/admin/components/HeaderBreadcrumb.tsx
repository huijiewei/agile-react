import { Link, matchRoutes, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { getRouters } from '@admin/routers';
import { Breadcrumb, Icon, BreadcrumbItem, BreadcrumbLink, Text } from '@chakra-ui/react';
import { Home } from 'react-feather';

const HeaderBreadcrumb = ({ height }: { height: string }) => {
  const location = useLocation();

  const routes = useMemo(() => {
    return getRouters();
  }, []);

  const match = matchRoutes(routes, location, process.env.PUBLIC_URL);

  console.log(match);

  return (
    <Breadcrumb paddingStart="3" height={height} lineHeight={height}>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to={'home'}>
          <Icon marginTop="-3px" as={Home}></Icon> 管理后台
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem isLastChild>
        <Text color="gray.600">首页</Text>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};

export { HeaderBreadcrumb };
