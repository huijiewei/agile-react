import { AuthLoginAction, useAuthLoginState } from '@shared/contexts/AuthLoginContext';
import { To } from 'history';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import LoginForm from '@admin/components/LoginForm';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

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

const LoginModal = ({ open }: { open: boolean }) => {
  return (
    <Dialog open={open}>
      <DialogTitle sx={{ textAlign: 'center' }}>管理员登录</DialogTitle>
      <DialogContent sx={{ marginBottom: 2, width: 390 }}>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

const AuthLogin = ({ children }: { children: ReactNode }) => {
  const authLoginAction = useAuthLoginState();

  if (authLoginAction == AuthLoginAction.DIRECT) {
    return <LoginDirect></LoginDirect>;
  }

  return (
    <>
      {children}
      <LoginModal open={authLoginAction == AuthLoginAction.MODAL}></LoginModal>
    </>
  );
};

export default AuthLogin;
