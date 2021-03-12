import { useForm } from 'react-hook-form';
import { useState } from 'react';
import {
  Button,
  FormControl,
  FormErrorMessage,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  InputRightAddon,
} from '@chakra-ui/react';
import { flatry } from '@shared/utils/util';
import useRequest from '@shared/hooks/useRequest';
import { useAuthUserDispatch } from '@admin/contexts/AuthUserContext';
import { useAuthLoginDispatch } from '@shared/contexts/AuthLoginContext';
import { useAuthToken } from '@admin/AppAuthProvider';
import { Eye, Lock, User } from 'react-feather';
import useFormError from '@admin/hooks/useFormError';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { register, handleSubmit, errors, setError, clearErrors, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAccessToken } = useAuthToken();
  const { httpPost, httpGet } = useRequest();
  const { setAuthUser } = useAuthUserDispatch();
  const { resetLoginAction } = useAuthLoginDispatch();
  const { bindErrors } = useFormError();
  const [captcha, setCaptcha] = useState(null);

  const updateCaptcha = async () => {
    const { data } = await flatry(httpGet('open/captcha', null, false));

    if (data) {
      setCaptcha(data);
    }

    setValue('captcha', '');
  };

  const removeCaptcha = () => {
    setCaptcha(null);
    setValue('captcha', '');
  };

  const onSubmit = async (form) => {
    setLoading(true);

    if (captcha) {
      // eslint-disable-next-line no-new-func
      const captchaProcess = new Function('captcha', captcha.process);

      form.captcha = captchaProcess(form.captcha);
    }

    const { data, error } = await flatry(httpPost('auth/login', form));

    if (data) {
      setAccessToken(data.accessToken);
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);

      resetLoginAction();

      onSuccess && onSuccess();
    }

    if (error) {
      const result = bindErrors(error, setError, clearErrors);

      if (result && result.captcha) {
        await updateCaptcha();
      } else {
        removeCaptcha();
      }

      console.log(errors);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <FormControl id="account" isInvalid={errors.account}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={User} color="gray.300" />
            </InputLeftElement>
            <Input name="account" ref={register({ required: true })} type="text" placeholder="手机号码或者电子邮箱" />
          </InputGroup>
          <FormErrorMessage>{errors.account && (errors.account.message || '请输入帐号')}</FormErrorMessage>
        </FormControl>
        <FormControl id="password" isInvalid={errors.password}>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon as={Lock} color="gray.300" />
            </InputLeftElement>
            <Input name="password" ref={register({ required: true })} type="password" placeholder="密码" />
          </InputGroup>
          <FormErrorMessage>{errors.password && (errors.password.message || '请输入密码')}</FormErrorMessage>
        </FormControl>
        {captcha && (
          <FormControl id="captcha" isInvalid={errors.captcha}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <Icon as={Eye} color="gray.300" />
              </InputLeftElement>
              <Input name="captcha" ref={register({ required: true })} type="password" placeholder="验证码" />
              <InputRightAddon>
                <img onClick={updateCaptcha} src={captcha.image} />
              </InputRightAddon>
            </InputGroup>
            <FormErrorMessage>{errors.captcha && (errors.captcha.message || '请输入验证码')}</FormErrorMessage>
          </FormControl>
        )}
        <Button isLoading={loading} type={'submit'} isFullWidth>
          确 定
        </Button>
      </Stack>
    </form>
  );
};

export default LoginForm;
