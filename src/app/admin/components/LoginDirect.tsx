import { VFC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { To } from 'history';

const LoginDirect: VFC = () => {
  const location = useLocation();

  const to: To = {
    pathname: 'login',
  };

  if (location.pathname !== 'login') {
    to.search = '?direct=' + location.pathname;
  }

  return <Navigate to={to} replace={true} />;
};

export default LoginDirect;
