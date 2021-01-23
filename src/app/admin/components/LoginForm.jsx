import {
  InputGroup,
  InputLeftElement,
  Input,
  FormControl,
  Icon,
  Stack,
  Button,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FaUser, FaLock } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

const LoginForm = () => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4} shouldWrapChildren={true}>
        <FormControl id="account" isInvalid={errors.account}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaUser} color="gray.300" />
            </InputLeftElement>
            <Input name="account" ref={register({ required: true })} type="text" placeholder="手机号码或者电子邮箱" />
          </InputGroup>
          <FormErrorMessage>{errors.account && '请输入帐号'}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={errors.password}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={FaLock} color="gray.300" />
            </InputLeftElement>
            <Input name="password" ref={register({ required: true })} type="password" placeholder="密码" />
          </InputGroup>
          <FormErrorMessage>{errors.password && '请输入密码'}</FormErrorMessage>
        </FormControl>
        <Button type={'submit'} isFullWidth={true} colorScheme="blue">
          确 定
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
