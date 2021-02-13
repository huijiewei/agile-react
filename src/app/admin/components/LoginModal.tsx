import LoginForm from '@admin/components/LoginForm';
import { FC } from 'react';

const LoginModal: FC = () => {
  return (
    <div>
      <div>
        <div>登录</div>
        <div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
