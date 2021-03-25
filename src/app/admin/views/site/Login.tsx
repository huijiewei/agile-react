import { LoginForm } from '@admin/components/LoginForm';
import { useNavigate, useSearchParams } from 'react-router-dom';

const Login = () => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSuccess = () => {
    navigator(searchParams.get('direct') || '../home', { replace: true });
  };

  return (
    <main
      style={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${require('../../assets/images/login-bg.jpg')})`,
      }}
    >
      <div
        style={{
          backgroundColor: '#ffffff',
          padding: 4,
          width: 390,
          borderRadius: 1,
          marginTop: -5,
        }}
      >
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <img
            style={{
              width: '50px',
            }}
            alt="Agile"
            src={require('../../assets/images/logo.png')}
          />
          <h1
            style={{
              fontWeight: 'bold',
              marginBottom: 3,
            }}
          >
            管理员登陆
          </h1>
        </div>
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </main>
  );
};

export default Login;
