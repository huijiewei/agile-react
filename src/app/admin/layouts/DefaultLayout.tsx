import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { Fragment, Suspense, useEffect, useState, VFC } from 'react';
import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import { useAuthUserState } from '@admin/contexts/AuthUserContext';
import {
  AppBar,
  Collapse,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { formatUrl, mapNestedPath } from '@shared/utils/utils';
import useRefreshUser from '@admin/hooks/useRefreshUser';

const drawerWidth = 220;

const AgileHead: VFC = () => {
  const { user } = useAuthUserState();

  return (
    <AppBar
      style={{ width: `calc(100% - ${drawerWidth}px)`, marginLeft: drawerWidth }}
      color="inherit"
      position="fixed"
    >
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          {user && user.name}
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

const AgileSideMenu: VFC = () => {
  const { menus } = useAuthUserState();

  console.log('AgileSideMenu Render');

  if (menus && menus.length > 0) {
    const map = mapNestedPath(menus, 'm-');

    console.log(map);
  }

  return (
    <List component={'nav'}>
      {menus.map((menu, index) => (
        <ListItem button key={'m-' + index}>
          <AgileSideMenuItem menu={menu} />
        </ListItem>
      ))}
    </List>
  );
};

const AgileSideMenuItem: VFC = ({ menu }) => {
  return (
    <>
      {menu.icon && (
        <ListItemIcon sx={{ minWidth: '1em', marginRight: '6px' }}>
          <svg
            style={{ display: 'inline-block', width: '1em', height: '1em' }}
            viewBox="0 0 1024 1024"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            dangerouslySetInnerHTML={{ __html: menu.icon }}
          />
        </ListItemIcon>
      )}
      <ListItemText>{menu.url ? <NavLink to={formatUrl(menu.url)}>{menu.label}</NavLink> : menu.label}</ListItemText>
    </>
  );
};

const AgileSideNestMenu: VFC = (props) => {
  const { menus, component, keyPrefix } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List component={component}>
      {menus.map((menu, index) => {
        return (
          <Fragment key={keyPrefix + index}>
            {menu.children ? (
              <>
                <AgileSideMenuItem open={open} hasChildren={true} onClick={handleClick} menu={menu} />
                <Collapse timeout="auto" in={open} unmountOnExit>
                  <AgileSideNestMenu keyPrefix={keyPrefix + index} component="div" menus={menu.children} />
                </Collapse>
              </>
            ) : (
              <AgileSideMenuItem
                hasChildren={false}
                onClick={() => {
                  return;
                }}
                menu={menu}
              />
            )}
          </Fragment>
        );
      })}
    </List>
  );
};

const AgileSide: VFC = () => {
  return (
    <Drawer
      style={{ width: drawerWidth, flexShrink: 0 }}
      PaperProps={{
        style: {
          width: drawerWidth,
        },
      }}
      open
      variant="persistent"
    >
      <div className={'ag-brand'}>
        <img alt="Agile" src={require('../assets/images/logo.png')} />
        <img alt="Boilerplate" src={require('../assets/images/banner-white.png')} />
      </div>
      <div className={'ag-scroll'}>
        <AgileSideMenu />
      </div>
    </Drawer>
  );
};

const DefaultLayout: VFC = () => {
  const refreshUser = useRefreshUser();

  useEffect(() => {
    refreshUser();
  }, [refreshUser]);

  const authLoginAction = useAuthLoginState();

  console.log('DefaultLayout Render');

  return authLoginAction == AuthLoginAction.DIRECT ? (
    <Navigate to={'login'} replace={true} />
  ) : (
    <Container style={{ display: 'flex' }} disableGutters={true} maxWidth={false}>
      <AgileHead />
      <AgileSide />
      <main style={{ flexGrow: 1, paddingTop: '60px', backgroundColor: '#f4f8fb' }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};

export default DefaultLayout;
