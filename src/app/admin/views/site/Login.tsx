import LoginForm from '@admin/components/LoginForm';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSuccess = () => {
    navigator(searchParams.get('direct') || '../home', { replace: true });
  };

  return (
    <div className={'ag-login'}>
      <div className={'ag-login-layout'}>
        <div className={'ag-login-main'}>
          <div className={'ag-login-head'}>
            <div>
              <img alt="Agile" src={require('../../assets/images/logo.png')} />
            </div>
            <h3>管理员登陆</h3>
          </div>
          <div className={'ag-login-form'}>
            <LoginForm onSuccess={handleSuccess} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
