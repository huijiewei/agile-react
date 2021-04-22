import { useLayoutState } from '@shared/components/layout/LayoutContext';
import { Box, Flex, IconButton, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { Icon } from '@shared/components/icon/Icon';
import { MenuUnfoldOne } from '@icon-park/react';
import { NavBreadcrumb } from '@admin/components/NavBreadcrumb';
import { NavUserMenu } from '@admin/components/NavUserMenu';

const NavHeader = (): JSX.Element => {
  const { headerHeight, asideWidth, asideCollapsedWidth, asideBackgroundColor } = useLayoutState();

  return (
    <Flex justifyContent="space-between" alignItems="center">
      <Flex alignItems={'center'}>
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
          icon={<Icon as={MenuUnfoldOne} />}
        />
        <NavBreadcrumb />
      </Flex>
      <Box>
        <NavUserMenu height={headerHeight} />
      </Box>
    </Flex>
  );
};

export { NavHeader };
