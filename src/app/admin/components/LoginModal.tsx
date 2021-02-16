import LoginForm from '@admin/components/LoginForm';
import { VFC } from 'react';

const LoginModal: VFC = () => {
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
