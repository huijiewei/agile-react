import useRequest from '@shared/hooks/useRequest';
import { useAuthToken } from '@admin/AppAuth';
import { Avatar, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Portal, useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import useAuthUser from '@admin/services/useAuthUser';
import { flatry } from '@shared/utils/util';
import { ChevronDown, LogOut, RefreshCw, User } from 'react-feather';

const HeaderUserMenu = () => {
  const { httpPost } = useRequest();
  const { setAccessToken } = useAuthToken();
  const toast = useToast();
  const navigate = useNavigate();
  const { authUser, mutate } = useAuthUser();

  const handleRefreshProfile = async () => {
    await mutate();
  };

  const handleLogout = async () => {
    const { data } = await flatry(httpPost('auth/logout', null));

    if (data) {
      setAccessToken('');
      await mutate(undefined, false);

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

  if (authUser && authUser.currentUser) {
    const user = authUser.currentUser;

    return (
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
    );
  }

  return null;
};

export default HeaderUserMenu;
