import { VFC } from 'react';
import { Box, Icon, Portal, Stack, IconButton, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthUserState } from '@admin/contexts/AuthUserContext';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar } from '@chakra-ui/react';
import { ChevronDown, LogOut, RefreshCw, RotateCw, User, Home } from 'react-feather';
import { noScrollbarsClassName } from 'react-remove-scroll-bar';

const AgileHeader: VFC = () => {
  const { user } = useAuthUserState();
  const location = useLocation();

  console.log(location);

  return (
    <Box
      className={noScrollbarsClassName}
      as={'header'}
      position={'fixed'}
      width={'calc(100% - 220px)'}
      left={'220px'}
      height={'50px'}
      lineHeight={'50px'}
      zIndex={30}
      backgroundColor={'white'}
    >
      <Stack spacing={3} direction={'row'} float={'left'} as={'div'}>
        <IconButton
          icon={<Icon as={RotateCw} />}
          float={'left'}
          variant={'ghost'}
          height={'50px'}
          width={'50px'}
          borderRadius={'none'}
          colorScheme={'gray'}
        />
        <Breadcrumb float={'left'}>
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
        <IconButton
          height={'50px'}
          width={'50px'}
          icon={<Icon as={RotateCw} />}
          float={'left'}
          variant={'ghost'}
          borderRadius={'none'}
          colorScheme={'gray'}
        />
      </Stack>
      <Box float={'right'} as={'div'}>
        {user && (
          <Menu isLazy>
            <MenuButton px={3} _hover={{ backgroundColor: 'gray.100' }}>
              <Avatar verticalAlign={'middle'} marginRight={'5px'} size={'sm'} name={user.name} src={user.avatar} />
              {user.name}
              <Icon marginLeft={'3px'} as={ChevronDown} />
            </MenuButton>
            <Portal>
              <MenuList>
                <MenuItem isDisabled>{user.adminGroup.name}</MenuItem>
                <MenuDivider />
                <MenuItem icon={<User size={15} />}>个人资料</MenuItem>
                <MenuItem icon={<RefreshCw size={15} />}>刷新资料</MenuItem>
                <MenuDivider />
                <MenuItem icon={<LogOut size={15} />}>退出登录</MenuItem>
              </MenuList>
            </Portal>
          </Menu>
        )}
      </Box>
    </Box>
  );
};

export default AgileHeader;
