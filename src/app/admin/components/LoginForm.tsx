import { useForm } from 'react-hook-form';
import { useCaptcha, processCaptcha } from '@admin/services/useCaptcha';
import { useAuthLogin } from '@admin/services/useAuth';
import { bindUnprocessableEntityErrors } from '@shared/utils/http';

import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Eyes, Lock, User } from '@icon-park/react';
import { Icon } from '@shared/components/icon/Icon';

type LoginFormProps = {
  onSuccess?: () => void;
};

type LoginForm = Record<string, unknown>;

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,

    formState: { errors },
  } = useForm();

  const toast = useToast();
  const { authLogin, loading } = useAuthLogin();
  const { captcha, updateCaptcha, removeCaptcha } = useCaptcha(() => {
    setValue('captcha', '');
  });

  const onSubmit = async (form: LoginForm) => {
    if (captcha) {
      form.captcha = processCaptcha(form.captcha, captcha.process);
    }

    const { data, error } = await authLogin<LoginForm>(form);

    if (data) {
      toast({
        position: 'top-right',
        description: '欢迎使用 Agile React',
        status: 'success',
        duration: 2000,
        variant: 'subtle',
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
    <Stack spacing={4} as="form" onSubmit={handleSubmit(onSubmit)}>
      <FormControl id="account" isInvalid={errors.account}>
        <FormLabel>帐号</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon as={User} color="gray.300" />
          </InputLeftElement>
          <Input {...register('account', { required: '请输入帐号' })} type="text" placeholder="手机号码或者电子邮箱" />
        </InputGroup>
        <FormErrorMessage>{errors.account?.message || ' '}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" isInvalid={errors.password}>
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
        <FormControl id="captcha" isInvalid={errors.captcha}>
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
              <img alt={'验证码'} onClick={updateCaptcha} src={captcha.image} />
            </InputRightAddon>
          </InputGroup>
          <FormErrorMessage>{errors.captcha?.message || ' '}</FormErrorMessage>
        </FormControl>
      )}

      <Button isLoading={loading} type={'submit'} isFullWidth>
        确 定
      </Button>
    </Stack>
  );
};

export { LoginForm };
