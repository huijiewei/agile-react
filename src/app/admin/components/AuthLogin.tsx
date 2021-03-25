import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import { To } from 'history';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { LoginForm } from '@admin/components/LoginForm';

const LoginDirect = () => {
  const location = useLocation();

  const to: To = {
    pathname: 'login',
  };

  if (location.pathname !== 'login') {
    to.search = '?direct=' + location.pathname;
  }

  return <Navigate to={to} replace={true} />;
};

const LoginModal = ({ isOpen }: { isOpen: boolean }) => {
  return isOpen ? (
    <div>
      <div />
      <header>管理员登录</header>
      <main>
        <LoginForm />
      </main>
    </div>
  ) : null;
};

const AuthLogin = ({ children }: { children: ReactNode }) => {
  const authLoginAction = useAuthLoginState();

  if (authLoginAction == AuthLoginAction.DIRECT) {
    return <LoginDirect />;
  }

  return (
    <>
      {children}
      <LoginModal isOpen={authLoginAction == AuthLoginAction.MODAL} />
    </>
  );
};

export { AuthLogin };
