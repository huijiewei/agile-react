import { setAuthAccessToken } from '@admin/AppAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@admin/services/useAuth';
import { useHttp } from '@shared/contexts/HttpContext';
import { requestFlatry } from '@shared/utils/http';
import { Menu, MenuButton, MenuList, MenuItem, MenuDivider, Avatar, Icon, Center } from '@chakra-ui/react';
import { ChevronDown, User, LogOut, RotateCw } from 'react-feather';

const HeaderUserMenu = ({ height }: { height: string }) => {
  const { post } = useHttp();
  const navigate = useNavigate();
  const { currentUser, mutate } = useAuth();

  const handleRefresh = async () => {
    await mutate();
  };

  const handleLogout = async () => {
    const { data } = await requestFlatry(post('auth/logout', null));

    if (data) {
      setAuthAccessToken('');

      await mutate(undefined, false);

      navigate('login', { replace: true });
    }
  };

  if (currentUser) {
    return (
      <Menu autoSelect={false}>
        <MenuButton
          sx={{ '&:hover, &[data-hover], &:active, &[data-active]': { backgroundColor: 'gray.100' } }}
          paddingStart="3"
          paddingEnd="3"
          height={height}
          lineHeight={height}
        >
          <Avatar verticalAlign="middle" size="sm" src={currentUser.avatar} name={currentUser.name} />
          &nbsp;
          {currentUser.name}
          &nbsp;
          <Icon as={ChevronDown}></Icon>
        </MenuButton>
        <MenuList>
          <MenuItem as={Center} isDisabled>
            {currentUser.adminGroup.name}
          </MenuItem>
          <MenuDivider />
          <MenuItem>
            <Icon as={User} />
            &nbsp;&nbsp;个人资料
          </MenuItem>
          <MenuItem onClick={handleRefresh}>
            <Icon as={RotateCw} />
            &nbsp;&nbsp;刷新资料
          </MenuItem>
          <MenuDivider />
          <MenuItem onClick={handleLogout}>
            <Icon as={LogOut} />
            &nbsp;&nbsp;退出登录
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return null;
};

export { HeaderUserMenu };
