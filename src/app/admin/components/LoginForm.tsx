import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { setAuthAccessToken } from '@admin/AppAuth';
import { Auth, setAuth } from '@admin/services/useAuth';
import { useHttp } from '@shared/contexts/HttpContext';
import { bindUnprocessableEntityErrors, requestFlatry } from '@shared/utils/http';
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
  FormLabel,
} from '@chakra-ui/react';
import { Eyes, Lock, User } from '@icon-park/react';

type LoginFormProps = {
  onSuccess?: () => void;
};

type Captcha = {
  image: string;
  process: string;
};

type AuthLogin = Auth & {
  accessToken: string;
};

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { register, handleSubmit, errors, setError, clearErrors, setValue } = useForm();
  const [loading, setLoading] = useState(false);
  const { post, get } = useHttp();
  const [captcha, setCaptcha] = useState<Captcha | null>(null);

  const updateCaptcha = async () => {
    const { data } = await requestFlatry<Captcha | undefined>(get('open/captcha', null, false));

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

    const { data, error } = await requestFlatry<AuthLogin>(post('auth/login', form));

    setLoading(false);

    if (data) {
      setAuthAccessToken(data.accessToken);

      await setAuth({
        currentUser: data.currentUser,
        groupMenus: data.groupMenus,
        groupPermissions: data.groupPermissions,
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
            <Icon verticalAlign="-0.125em" as={User} color="gray.300" />
          </InputLeftElement>
          <Input
            name="account"
            ref={register({ required: '请输入帐号' })}
            type="text"
            placeholder="手机号码或者电子邮箱"
          />
        </InputGroup>
        <FormErrorMessage>{errors.account?.message || ' '}</FormErrorMessage>
      </FormControl>
      <FormControl id="password" isInvalid={errors.password}>
        <FormLabel>密码</FormLabel>
        <InputGroup>
          <InputLeftElement pointerEvents="none">
            <Icon verticalAlign="-0.125em" as={Lock} color="gray.300" />
          </InputLeftElement>
          <Input name="password" ref={register({ required: '请输入密码' })} type="password" placeholder="密码" />
        </InputGroup>
        <FormErrorMessage>{errors.password?.message || ' '}</FormErrorMessage>
      </FormControl>
      {captcha && (
        <FormControl id="captcha" isInvalid={errors.captcha}>
          <FormLabel>验证码</FormLabel>
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <Icon verticalAlign="-0.125em" as={Eyes} color="gray.300" />
            </InputLeftElement>
            <Input name="captcha" ref={register({ required: '请输入验证码' })} type="text" placeholder="验证码" />
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
