import useRequest from '@shared/hooks/useRequest';
import { useAuthToken } from '@admin/AppAuth';
import { useNavigate } from 'react-router-dom';
import useAuthUser from '@admin/services/useAuthUser';
import { flatry } from '@shared/utils/util';
import { Avatar, ButtonBase, Menu, Box, MenuItem } from '@material-ui/core';
import { useState } from 'react';

const HeaderUserMenu = () => {
  const { httpPost } = useRequest();
  const { setAccessToken } = useAuthToken();
  const navigate = useNavigate();
  const { authUser, mutate } = useAuthUser();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleRefresh = async () => {
    await mutate();
  };

  const handleLogout = async () => {
    const { data } = await flatry(httpPost('auth/logout', null));

    if (data) {
      setAccessToken('');
      await mutate(undefined, false);

      navigate('login', { replace: true });
    }
  };

  if (authUser && authUser.currentUser) {
    const user = authUser.currentUser;

    return (
      <>
        <ButtonBase onClick={handleButtonClick}>
          <Avatar src={user.avatar} alt={user.name}/>
          <Box component="span">{user.name}</Box>
        </ButtonBase>
        <Menu onClose={handleMenuClose} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)}>
          <MenuItem disabled>{user.adminGroup.name}</MenuItem>
          <MenuItem>个人资料</MenuItem>
          <MenuItem onClick={handleRefresh}>刷新资料</MenuItem>
          <MenuItem onClick={handleLogout}>退出登录</MenuItem>
        </Menu>
      </>
    );
  }

  return null;
};

export default HeaderUserMenu;
