import { Box, Button, Center, Flex, Image, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Flex width={'100%'} alignContent={'center'} alignItems={'center'} justifyContent={'center'}>
      <Box margin={'0 auto'} backgroundColor={'white'} width={360} borderRadius={'base'} boxShadow="xl" padding={10}>
        <Stack spacing={3} textAlign={'center'}>
          <Box as={Center}>
            <Image boxSize={'50px'} alt="Not Found" src={require('../../assets/images/logo.png')} />
          </Box>
          <Box fontWeight={'bold'} as={'h3'}>
            404
          </Box>
          <Box as={'p'}>页面不存在</Box>
          <Box as={'p'}>
            <Button onClick={handleBack}>返回</Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default NotFound;
