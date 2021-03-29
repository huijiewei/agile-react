import { Link, matchRoutes, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { getRouters } from '@admin/routers';
import { Box, Icon } from '@chakra-ui/react';
import { Home } from 'react-feather';

const HeaderBreadcrumb = ({ height }: { height: string }) => {
  const location = useLocation();

  const routes = useMemo(() => {
    return getRouters();
  }, []);

  const match = matchRoutes(routes, location, process.env.PUBLIC_URL);

  console.log(match);

  return (
    <Box paddingStart="5" lineHeight={height}>
      <Link to={'home'}>
        <Icon as={Home} marginTop="-3px" /> 管理后台
      </Link>
    </Box>
  );
};

export { HeaderBreadcrumb };
