import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { Suspense, useState, VFC } from 'react';
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
} from '@material-ui/core';
import useRefreshAuthUser from '@admin/hooks/useRefreshAuthUser';
import { formatUrl } from '@shared/utils/utils';
import { ExpandLess, ExpandMore } from '@material-ui/icons';

const drawerWidth = 220;

const AgileHead: VFC = () => {
  return (
    <AppBar color="transparent" position="fixed">
      <Toolbar></Toolbar>
    </AppBar>
  );
};

const AgileSideMenu: VFC = () => {
  const { menus } = useAuthUserState();

  return <AgileSideNestMenu keyPrefix="m-" component="nav" menus={menus} />;
};

const AgileSideMenuItem: VFC = (props) => {
  const { menu, hasChildren, onClick, open } = props;

  return (
    <ListItem button onClick={onClick}>
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
      <ListItemText disableTypography>
        {menu.url ? <NavLink to={formatUrl(menu.url)}>{menu.label}</NavLink> : menu.label}
      </ListItemText>
      {hasChildren && (open ? <ExpandLess /> : <ExpandMore />)}
    </ListItem>
  );
};

const AgileSideNestMenu: VFC = (props) => {
  const { menus, component, keyPrefix } = props;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    console.log(open);
    setOpen(!open);
  };

  return (
    <List component={component}>
      {menus.map((menu, index) => {
        return (
          <>
            <AgileSideMenuItem
              open={open}
              hasChildren={!!menu.children}
              onClick={handleClick}
              key={keyPrefix + index}
              menu={menu}
            />
            {menu.children && (
              <Collapse key={'c' + keyPrefix + index} timeout="auto" in={open} unmountOnExit>
                <AgileSideNestMenu keyPrefix={keyPrefix + index} component="div" menus={menu.children} />
              </Collapse>
            )}
          </>
        );
      })}
    </List>
  );
};

const AgileSide: VFC = () => {
  return (
    <Drawer style={{ width: drawerWidth, flexShrink: 0 }} open variant="persistent">
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
  useRefreshAuthUser();

  const authLoginAction = useAuthLoginState();

  console.log('DefaultLayout Render');

  return authLoginAction == AuthLoginAction.DIRECT ? (
    <Navigate to={'login'} replace={true} />
  ) : (
    <Container style={{ display: 'flex' }} disableGutters={true} maxWidth={false}>
      <AgileHead />
      <AgileSide />
      <main style={{ flexGrow: 1 }}>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};

export default DefaultLayout;
