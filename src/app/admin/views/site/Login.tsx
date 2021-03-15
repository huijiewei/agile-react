import LoginForm from '@admin/components/LoginForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Container, Typography } from '@material-ui/core';

const Login = () => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSuccess = () => {
    navigator(searchParams.get('direct') || '../home', { replace: true });
  };

  return (
    <Container
      component="main"
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
          padding: 4,
          width: 390,
          borderRadius: 1,
          boxShadow: 3,
          marginTop: -5,
        }}
      >
        <Box
          sx={{
            textAlign: 'center',
          }}
        >
          <Box
            component="img"
            sx={{
              width: '50px',
            }}
            alt="Agile"
            src={require('../../assets/images/logo.png')}
          />
          <Typography
            sx={{
              fontWeight: 'bold',
              marginBottom: 3,
            }}
            component="h1"
            variant="subtitle1"
          >
            管理员登陆
          </Typography>
        </Box>
        <LoginForm onSuccess={handleSuccess} />
      </Box>
    </Container>
  );
};

export default Login;
