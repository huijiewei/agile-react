import { InputGroup, InputLeftElement, Input, FormControl, Icon, Stack, Button } from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { register, handleSubmit, watch, errors } = useForm();
  const onSubmit = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="account">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaUser} color="gray.300" />
            </InputLeftElement>
            <Input type="text" placeholder="手机号码或者电子邮箱" />
          </InputGroup>
        </FormControl>
        <FormControl id="password">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaLock} color="gray.300" />
            </InputLeftElement>
            <Input type="password" placeholder="密码" />
          </InputGroup>
        </FormControl>
        <Button type={'submit'} isFullWidth={true} colorScheme="blue">
          确 定
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
