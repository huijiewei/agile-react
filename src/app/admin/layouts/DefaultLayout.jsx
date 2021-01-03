import { Link, Outlet } from 'react-router-dom';
import { Flex, Button } from '@chakra-ui/react';
import useError from '@shared/hooks/useError';

const AgileHeader = () => {
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

const AgileSide = () => {
  return (
    <Flex w={'220px'} className={'ag-side'}>
      <div className={'ag-brand'}>
        <img alt="Agile" src={require('../assets/images/logo.png')} />
        <img alt="Boilerplate" src={require('../assets/images/banner-white.png')} />
      </div>
      <div className={'ag-scroll'}>
        <nav>
          <li>
            <Link to="home">Home</Link>
          </li>
          <li>
            <Link to="about">About</Link>
          </li>
          <li>
            <Link to="login">Login</Link>
          </li>
          <li>
            <Link to="404">404</Link>
          </li>
        </nav>
      </div>
    </Flex>
  );
};

const DefaultLayout = () => {
  const { addError } = useError();

  const handleError = () => {
    addError('ERROR', true);
  };

  return (
    <Flex className={'ag-layout'}>
      <AgileSide />
      <div className={'ag-main'}>
        <AgileHeader />
        <main className={'ag-content'}>
          <div>
            <h2>Welcome to the Agile!</h2>
            <Button onClick={handleError}>错误</Button>
          </div>
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </Flex>
  );
};

export default DefaultLayout;
