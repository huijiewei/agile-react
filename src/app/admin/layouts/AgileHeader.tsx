import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Portal,
  Stack,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthUserDispatch, useAuthUserState } from '@admin/contexts/AuthUserContext';
import { ChevronDown, Home, LogOut, RefreshCw, RotateCw, User } from 'react-feather';
import { noScrollbarsClassName } from 'react-remove-scroll-bar';
import useRequest from '@shared/hooks/useRequest';
import { useAuthToken } from '@admin/AppAuthProvider';
import { useToast } from '@chakra-ui/react';
import { flatry } from '@shared/utils/util';
import useRefreshUser from '@admin/hooks/useRefreshUser';

const HeaderUserMenu = () => {
  const { user } = useAuthUserState();
  const { httpPost } = useRequest();
  const { setAccessToken } = useAuthToken();
  const { resetAuthUser } = useAuthUserDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const refreshUser = useRefreshUser();

  const handleRefreshProfile = async () => {
    await refreshUser();
  };

  const handleLogout = async () => {
    const { data } = await flatry(httpPost('auth/logout', null));

    if (data) {
      setAccessToken('');
      resetAuthUser();

      toast({
        description: '退出登录成功',
        status: 'success',
        isClosable: false,
        variant: 'subtle',
        position: 'top',
        duration: 1100,
        onCloseComplete: () => {
          navigate('login', { replace: true });
        },
      });
    }
  };

  return (
    user && (
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
            <MenuItem onClick={handleRefreshProfile} icon={<RefreshCw size={15} />}>
              刷新资料
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogout} icon={<LogOut size={15} />}>
              退出登录
            </MenuItem>
          </MenuList>
        </Portal>
      </Menu>
    )
  );
};

const AgileHeader = () => {
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
      <Stack spacing={2} direction={'row'} float={'left'} as={'div'}>
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
        <HeaderUserMenu />
      </Box>
    </Box>
  );
};

export default AgileHeader;
