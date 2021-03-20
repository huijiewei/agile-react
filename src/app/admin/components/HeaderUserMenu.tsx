import { setAuthAccessToken } from '@admin/AppAuth';
import { useNavigate } from 'react-router-dom';
import useAuth from '@admin/services/useAuth';
import { Avatar, Box, ButtonBase, Menu, MenuItem } from '@material-ui/core';
import { MouseEvent, useState } from 'react';
import { useHttp } from '@shared/contexts/HttpContext';
import { requestFlatry } from '@shared/utils/http';

const HeaderUserMenu = () => {
  const { post } = useHttp();
  const navigate = useNavigate();
  const { authUser, mutate } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleButtonClick = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

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

  if (authUser && authUser.currentUser) {
    const user = authUser.currentUser;

    return (
      <>
        <ButtonBase onClick={handleButtonClick}>
          <Avatar src={user.avatar} alt={user.name} />
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
