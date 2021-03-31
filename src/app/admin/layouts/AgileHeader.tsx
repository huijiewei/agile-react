import { HeaderUserMenu } from '@admin/components/HeaderUserMenu';
import { HeaderBreadcrumb } from '@admin/components/HeaderBreadcrumb';
import { Box, Flex, Icon, IconButton, Image } from '@chakra-ui/react';
import { useLayoutState } from '@shared/components/layout/LayoutContext';
import { Link } from 'react-router-dom';
import { AlignLeft } from 'react-feather';

const AgileHeader = () => {
  const { headerHeight, asideWidth, asideCollapsedWidth, asideBackgroundColor } = useLayoutState();

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex>
        <Box
          overflow="hidden"
          width={[asideCollapsedWidth, asideCollapsedWidth, asideCollapsedWidth, asideCollapsedWidth, asideWidth]}
          height={headerHeight}
          lineHeight={headerHeight}
          textAlign="center"
          backgroundColor={asideBackgroundColor}
        >
          <Link to={'home'}>
            <Image display="inline-block" height="36px" alt="Agile" src={require('../assets/images/logo.png')} />
            <Image
              display="inline-block"
              height="36px"
              alt="Boilerplate"
              src={require('../assets/images/banner-white.png')}
            />
          </Link>
        </Box>
        <IconButton
          colorScheme="gray"
          variant="ghost"
          height={headerHeight}
          width={headerHeight}
          aria-label="展开收缩菜单"
          icon={<Icon as={AlignLeft}></Icon>}
        />
        <HeaderBreadcrumb height={headerHeight} />
      </Flex>
      <Box>
        <HeaderUserMenu height={headerHeight} />
      </Box>
    </Flex>
  );
};

export default AgileHeader;
