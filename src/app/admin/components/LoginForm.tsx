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
  InputRightAddon,
  Stack,
} from '@chakra-ui/react';
import useRequest, { requestFlatry } from '@shared/hooks/useRequest';
import { useAuthLoginDispatch } from '@shared/contexts/AuthLoginContext';
import { useAuthToken } from '@admin/AppAuth';
import { Eye, Lock, User } from 'react-feather';
import useFormError from '@admin/hooks/useFormError';
import { AuthUserLogin, setAuthUser } from '@admin/services/useAuthUser';

interface LoginFormProps {
  onSuccess?: () => void;
}

interface Captcha {
  image: string;
  process: string;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { register, handleSubmit, errors, setError, clearErrors, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAccessToken } = useAuthToken();
  const { httpPost, httpGet } = useRequest();
  const { resetLoginAction } = useAuthLoginDispatch();
  const { bindErrors } = useFormError();
  const [captcha, setCaptcha] = useState<Captcha | null>(null);

  const updateCaptcha = async () => {
    const { data } = await requestFlatry<Captcha | undefined>(httpGet('open/captcha', null, false));

    if (data) {
      setCaptcha(data);
    }

    setValue('captcha', '');
  };

  const removeCaptcha = () => {
    setCaptcha(null);
    setValue('captcha', '');
  };

  const onSubmit = async (form: Record<string, unknown>) => {
    setLoading(true);

    if (captcha) {
      // eslint-disable-next-line no-new-func
      const captchaProcess = new Function('captcha', captcha.process);

      form.captcha = captchaProcess(form.captcha);
    }

    const { data, error } = await requestFlatry<AuthUserLogin>(httpPost('auth/login', form));

    setLoading(false);

    if (data) {
      setAccessToken(data.accessToken);
      await setAuthUser({
        currentUser: data.currentUser,
        groupMenus: data.groupMenus,
        groupPermissions: data.groupPermissions,
      });

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
    }
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
                <img alt={'验证码'} onClick={updateCaptcha} src={captcha.image} />
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
