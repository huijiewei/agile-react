import { useForm } from 'react-hook-form';
import { processCaptcha, useCaptcha } from '@admin/services/useCaptcha';
import { useAuthLogin } from '@admin/services/useAuth';
import { bindUnprocessableEntityErrors } from '@shared/utils/http';

import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
} from '@chakra-ui/react';
import { Eyes, Lock, User } from '@icon-park/react';
import { Icon } from '@shared/components/icon/Icon';
import { Form } from '@shared/components/form/Form';
import { useMessage } from '@shared/hooks/useMessage';

type LoginFormProps = {
  onSuccess?: () => void;
};

type LoginForm = Record<string, unknown>;

const LoginForm = ({ onSuccess }: LoginFormProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const { success } = useMessage();
  const { login, loading } = useAuthLogin();
  const { captcha, updateCaptcha, removeCaptcha } = useCaptcha(() => {
    setValue('captcha', '');
  });

  const onSubmit = async (formData: LoginForm) => {
    if (captcha) {
      formData.captcha = processCaptcha(formData.captcha, captcha.process);
    }

    const { data, error } = await login<LoginForm>(formData);

    if (data) {
      success('Agile React 是一个基于 React, TypeScript, Chakra UI, Webpack 5 的后台管理演示项目.', {
        position: 'top-right',
        title: '欢迎使用 Agile React',
        isClosable: true,
      });

      onSuccess && onSuccess();
    }

    if (error) {
      const result = bindUnprocessableEntityErrors(
        error,
        (field, message) => {
          setError(field, { type: 'manual', message: message });
        },
        () => clearErrors
      );

      if (result && result.captcha) {
        await updateCaptcha();
      } else {
        removeCaptcha();
      }
    }
  };

  return (
    <Form spacing={4} onSubmit={handleSubmit(onSubmit)}>
      <FormControl isRequired id="account" isInvalid={errors.account}>
        <FormLabel>帐号</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={User} color="gray.300" />
          </InputLeftElement>
          <Input {...register('account', { required: '请输入帐号' })} type="text" placeholder="手机号码或者电子邮箱" />
        </InputGroup>
        <FormErrorMessage>{errors.account?.message || ' '}</FormErrorMessage>
      </FormControl>
      <FormControl isRequired id="password" isInvalid={errors.password}>
        <FormLabel>密码</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={Lock} color="gray.300" />
          </InputLeftElement>
          <Input {...register('password', { required: '请输入密码' })} type="password" placeholder="密码" />
        </InputGroup>
        <FormErrorMessage>{errors.password?.message || ' '}</FormErrorMessage>
      </FormControl>
      {captcha && (
        <FormControl isRequired id="captcha" isInvalid={errors.captcha}>
          <FormLabel>验证码</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={Eyes} color="gray.300" />
            </InputLeftElement>
            <Input
              textTransform={'uppercase'}
              {...register('captcha', { required: '请输入验证码' })}
              type="text"
              placeholder="验证码"
            />
            <InputRightAddon>
              <div role="button" tabIndex={0} onKeyDown={updateCaptcha} onMouseDown={updateCaptcha}>
                <img alt={'验证码'} src={captcha.image} />
              </div>
            </InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{errors.captcha?.message || ' '}</FormErrorMessage>
        </FormControl>
      )}

      <Box>
        <Button isLoading={loading} type={'submit'} width={'full'}>
          确 定
        </Button>
      </Box>
    </Form>
  );
};

export { LoginForm };
