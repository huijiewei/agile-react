import LoginForm from '@admin/components/LoginForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Container } from '@material-ui/core';

const Login = () => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSuccess = () => {
    navigator(searchParams.get('direct') || '../home', { replace: true });
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        display: 'flex',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundSize: 'cover',
        backgroundImage: `url(${require('../../assets/images/login-bg.jpg')})`,
      }}
    >
      <Box
        sx={{
          backgroundColor: '#ffffff',
          padding: 3,
          width: 390,
          borderRadius: 1,
          boxShadow: 2,
        }}
      >
        <Box>
          <img alt="Agile" src={require('../../assets/images/logo.png')} />
          <h3>管理员登陆</h3>
        </Box>
        <Box>
          <LoginForm onSuccess={handleSuccess} />
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
