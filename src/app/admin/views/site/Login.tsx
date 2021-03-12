import LoginForm from '@admin/components/LoginForm';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Flex, Heading, Image, Stack } from '@chakra-ui/react';

const Login = () => {
  const navigator = useNavigate();
  const [searchParams] = useSearchParams();

  const handleSuccess = () => {
    navigator(searchParams.get('direct') || '../home', { replace: true });
  };

  return (
    <Box
      width={'100%'}
      height={'100%'}
      backgroundSize={'cover'}
      backgroundImage={`url(${require('../../assets/images/login-bg.jpg')})`}
    >
      <Flex height={'100vh'} alignItems={'center'} justifyContent={'center'}>
        <Box
          marginTop={'-100px'}
          backgroundColor={'white'}
          boxShadow={'xl'}
          borderRadius={'base'}
          width={'390px'}
          padding={'30px 50px'}
        >
          <Stack spacing={4} marginBottom={'30px'} alignItems={'center'} textAlign={'center'}>
            <Image align={'center'} boxSize={'39px'} alt="Agile" src={require('../../assets/images/logo.png')} />
            <Heading color={'#67757c'} as="h3" size="md">
              管理员登陆
            </Heading>
          </Stack>
          <div className={'ag-login-form'}>
            <LoginForm onSuccess={handleSuccess} />
          </div>
        </Box>
      </Flex>
    </Box>
  );
};

export default Login;
