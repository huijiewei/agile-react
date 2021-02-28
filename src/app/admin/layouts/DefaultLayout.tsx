import { Navigate, NavLink, Outlet } from 'react-router-dom';
import { FC, Suspense, VFC } from 'react';
import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import { IMenu, useAuthUserState } from '@admin/contexts/AuthUserContext';
import { AppBar, Container, Drawer, List, ListItem, ListItemIcon, ListItemText, Toolbar } from '@material-ui/core';
import useRefreshAuthUser from '@admin/hooks/useRefreshAuthUser';
import { formatUrl } from '@shared/utils/utils';

const drawerWidth = 220;

const AgileHeader: VFC = () => {
  return (
    <header className={'ag-header'}>
      <nav className={'ag-nav'}>
        <div className={'ag-left'}>1</div>
      </nav>
      <div className={'ag-tabs'}>
        <ul>
          <li>Tab 1</li>
          <li>Tab 2</li>
          <li>Tab 3</li>
          <li>Tab 4</li>
          <li>Tab 5</li>
          <li>Tab 6</li>
        </ul>
      </div>
    </header>
  );
};

const AgileSideMenu: VFC = () => {
  const { menus } = useAuthUserState();

  return <AgileSideNestMenu menus={menus} />;
};

const AgileSideMenuItem: VFC = ({ menu }) => {
  return (
    <ListItem button>
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
    </ListItem>
  );
};

const AgileSideNestMenu: VFC = ({ menus }) => {
  return (
    <List>
      {menus.map((menu) => {
        return (
          <>
            <AgileSideMenuItem menu={menu} />
            {menu.children && <AgileSideNestMenu menus={menu.children} />}
          </>
        );
      })}
    </List>
  );
};

const AgileSide: VFC = () => {
  return (
    <Drawer open={true} variant={'permanent'}>
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
    <Container disableGutters={true} maxWidth={false}>
      <AppBar color="transparent" position="fixed">
        <Toolbar></Toolbar>
      </AppBar>
      <AgileSide />
      <main>
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
      </main>
    </Container>
  );
};

export default DefaultLayout;
