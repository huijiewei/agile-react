import { Box, Button, Center, Flex, Image, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Flex height="full" alignContent="center" alignItems="center" justifyContent="center">
      <Stack spacing="3" padding="5" boxShadow="md" width="xs" backgroundColor="white">
        <Center>
          <Image height="50px" alt="Not Found" src={require('../../assets/images/logo.png')} />
        </Center>
        <Center fontWeight="bold" fontSize="large" as="h1">
          404
        </Center>
        <Center>页面不存在</Center>
        <Center>
          <Button onClick={handleBack}>返回</Button>
        </Center>
      </Stack>
    </Flex>
  );
};

export default NotFound;
