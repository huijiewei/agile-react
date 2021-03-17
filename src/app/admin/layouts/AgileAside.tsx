import { Link, NavLink } from 'react-router-dom';
import { Box, Drawer } from '@material-ui/core';

const menus = [
  {
    url: 'home',
    label: '主页',
  },
  {
    url: 'about',
    label: '关于',
  },
  {
    url: 'admin',
    label: '管理员',
  },
  {
    url: 'admin-group',
    label: '管理组',
  },
  {
    url: 'user',
    label: '用户',
  },
  {
    url: 'component',
    label: '组件',
  },
  {
    url: 'nest',
    label: '嵌套页面',
  },
  {
    url: '404',
    label: '404',
  },
];

const AgileAside = () => {
  return (
    <Drawer
      sx={{
        color: 'white',
        backgroundColor: '#2c343f',
        width: 220,
      }}
      variant="permanent"
    >
      <Box>
        <Link to={'home'}>
          <Box sx={{ height: 39 }} component="img" alt="Agile" src={require('../assets/images/logo.png')} />
          <Box
            sx={{ height: 39 }}
            component="img"
            alt="Boilerplate"
            src={require('../assets/images/banner-white.png')}
          />
        </Link>
      </Box>
      <Box component={'nav'}>
        {menus.map((menu, index) => (
          <li key={'m-' + index}>
            <NavLink to={menu.url}>{menu.label}</NavLink>
          </li>
        ))}
        {[
          1,
          2,
          3,
          4,
          5,
          6,
          7,
          8,
          9,
          10,
          11,
          12,
          13,
          14,
          15,
          16,
          17,
          18,
          19,
          20,
          21,
          22,
          23,
          24,
          25,
          26,
          27,
          28,
          29,
          30,
          31,
          32,
          33,
          34,
          35,
        ].map((item) => (
          <li key={'ms-' + item}>搞出滚动条{item}</li>
        ))}
      </Box>
    </Drawer>
  );
};

export default AgileAside;
