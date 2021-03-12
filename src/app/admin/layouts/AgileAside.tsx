import { VFC } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

const AgileAside: VFC = () => {
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
      url: '404',
      label: '404',
    },
  ];

  return (
    <Box as={'aside'} width={'220px'} height={'100vh'} position={'fixed'} color={'#fff'} backgroundColor={'#2c343f'}>
      <div className="ag-brand">
        <Link to={'home'}>
          <img alt="Agile" src={require('../assets/images/logo.png')} />
          <img alt="Boilerplate" src={require('../assets/images/banner-white.png')} />
        </Link>
      </div>
      <nav className="list-none">
        {menus.map((menu, index) => (
          <li key={'m-' + index} className="leading-8">
            <NavLink className="font-medium" to={menu.url}>
              {menu.label}
            </NavLink>
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
      </nav>
    </Box>
  );
};

export default AgileAside;
