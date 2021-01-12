import LoginForm from '@admin/components/LoginForm';

const Login = () => {
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
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
