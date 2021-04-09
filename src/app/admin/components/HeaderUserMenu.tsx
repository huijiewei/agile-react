import { setAuthAccessToken } from '@admin/AppAuth';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@admin/services/useAuth';
import { useHttp } from '@shared/contexts/HttpContext';
import { requestFlatry } from '@shared/utils/http';
import { Avatar, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { Down, Logout, Refresh, User } from '@icon-park/react';
import { Icon } from '@shared/components/icon/Icon';
import { useMessage } from '@shared/hooks/useMessage';

const HeaderUserMenu = ({ height }: { height: string }) => {
  const { apiPost } = useHttp();
  const navigate = useNavigate();
  const { success } = useMessage();
  const { currentUser, mutate } = useAuth();

  const handleRefresh = async () => {
    await mutate();
  };

  const handleLogout = async () => {
    const { data } = await requestFlatry<{ message: string }>(apiPost('auth/logout', null));

    if (data) {
      setAuthAccessToken('');

      await mutate(undefined, false);

      success(data.message, {
        duration: 1000,
        onCloseComplete: () => {
          navigate('login', { replace: true });
        },
      });
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
          <Avatar marginEnd="6px" verticalAlign="middle" size="sm" src={currentUser.avatar} name={currentUser.name} />
          {currentUser.name}
          <Icon marginStart="6px" verticalAlign="-3px" as={Down} />
        </MenuButton>
        <MenuList>
          <MenuItem as={Center} isDisabled>
            {currentUser.adminGroup.name}
          </MenuItem>
          <MenuDivider />
          <MenuItem iconSpacing="10px" icon={<User />}>
            个人资料
          </MenuItem>
          <MenuItem iconSpacing="10px" icon={<Icon as={Refresh} />} onClick={handleRefresh}>
            刷新资料
          </MenuItem>
          <MenuDivider />
          <MenuItem iconSpacing="10px" icon={<Icon as={Logout} />} onClick={handleLogout}>
            退出登录
          </MenuItem>
        </MenuList>
      </Menu>
    );
  }

  return null;
};

export { HeaderUserMenu };
