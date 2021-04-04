import { LoginForm } from '@admin/components/LoginForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Center, Image, Text, Stack } from '@chakra-ui/react';
import { useAuthLoginDispatch } from '@shared/contexts/AuthLoginContext';

const Login = () => {
  const { resetLoginAction } = useAuthLoginDispatch();
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSuccess = () => {
    resetLoginAction();

    navigator(searchParams.get('direct') || '../home', { replace: true });
  };

  return (
    <Box
      as="main"
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
          backgroundColor: 'white',
          padding: 7,
          width: 360,
          borderRadius: 1,
          marginTop: -32,
        }}
      >
        <Stack sx={{ marginBottom: 4 }} spacing={3}>
          <Center>
            <Image
              sx={{
                width: '50px',
              }}
              alt="Agile"
              src={require('../../assets/images/logo.png')}
            />
          </Center>

          <Center>
            <Text fontWeight="bold" fontSize="lg" as="h1">
              管理员登陆
            </Text>
          </Center>
        </Stack>
        <LoginForm onSuccess={handleSuccess} />
      </Box>
    </Box>
  );
};

export default Login;
