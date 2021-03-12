import { VFC } from 'react';
import { Flex, Box, Image, Center, Stack, Button, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const NotFound: VFC = () => {
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
            <Button to={-1} as={Link}>
              返回
            </Button>
          </Box>
        </Stack>
      </Box>
    </Flex>
  );
};

export default NotFound;
