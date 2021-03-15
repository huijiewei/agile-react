import LoginForm from '@admin/components/LoginForm';
import { Dialog, DialogTitle, DialogContent } from '@material-ui/core';

const LoginModal = () => {
  return (
    <Dialog open>
      <DialogTitle sx={{ textAlign: 'center' }}>管理员登录</DialogTitle>
      <DialogContent sx={{ marginBottom: 2, width: 390 }}>
        <LoginForm />
      </DialogContent>
    </Dialog>
  );
};

export default LoginModal;
