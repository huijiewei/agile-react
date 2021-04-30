import { useHttp } from '@shared/contexts/HttpContext';
import { useMessage } from '@shared/hooks/useMessage';
import { useAuth, setAuth } from '@admin/services/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLoginDirect } from '@admin/hooks/useLoginDirect';
import { requestFlatry } from '@shared/utils/http';
import { setAuthAccessToken } from '@admin/AppAuth';
import { Avatar, Center, Menu, MenuButton, MenuDivider, MenuItem, MenuList } from '@chakra-ui/react';
import { Icon } from '@shared/components/icon/Icon';
import { Down, Logout, Refresh, User } from '@icon-park/react';

const LogoutMenuItem = (): JSX.Element => {
  const { apiPost } = useHttp();
  const { success } = useMessage();

  const navigate = useNavigate();
  const direct = useLoginDirect();

  const onLogout = async () => {
    const { data } = await requestFlatry<{ message: string }>(apiPost('auth/logout', null));

    if (data) {
      setAuthAccessToken('');

      await setAuth(undefined);

      success(data.message, {
        duration: 1000,
        onCloseComplete: () => {
          navigate(direct, { replace: true });
        },
      });
    }
  };

  return (
    <MenuItem iconSpacing="3" icon={<Icon as={Logout} />} onClick={onLogout}>
      退出登录
    </MenuItem>
  );
};

const NavUserMenu = ({ height }: { height: string }): JSX.Element | null => {
  const { currentUser, mutate } = useAuth();

  const onRefresh = async () => {
    await mutate();
  };

  return (
    currentUser && (
      <Menu isLazy autoSelect={false}>
        <MenuButton
          sx={{ '&:hover, &[data-hover], &:active, &[data-active]': { backgroundColor: 'gray.100' } }}
          paddingStart="3"
          paddingEnd="3"
          height={height}
          lineHeight={height}
        >
          <Avatar marginEnd="2" verticalAlign="middle" size="sm" src={currentUser.avatar} name={currentUser.name} />
          {currentUser.name}
          <Icon marginStart="2" as={Down} />
        </MenuButton>
        <MenuList>
          <MenuItem isDisabled as={Center}>
            {currentUser.adminGroup.name}
          </MenuItem>
          <MenuDivider />
          <MenuItem iconSpacing="3" icon={<Icon as={User} />}>
            个人资料
          </MenuItem>
          <MenuItem iconSpacing="3" icon={<Icon as={Refresh} />} onClick={onRefresh}>
            刷新资料
          </MenuItem>
          <MenuDivider />
          <LogoutMenuItem />
        </MenuList>
      </Menu>
    )
  );
};

export { NavUserMenu };
