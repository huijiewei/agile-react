import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { AccountCircleOutlined, LockOutlined, Visibility } from '@material-ui/icons';
import LoadingButton from '@material-ui/lab/LoadingButton';

import useRequest, { requestFlatry } from '@shared/hooks/useRequest';
import { useAuthLoginDispatch } from '@shared/contexts/AuthLoginContext';
import { useAuthToken } from '@admin/AppAuth';
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
      <TextField
        sx={{ marginBottom: 1.2 }}
        error={!!errors.account}
        helperText={errors.account ? errors.account.message || '请输入帐号' : ' '}
        label="帐号"
        name="account"
        fullWidth
        placeholder="手机号码或者电子邮箱"
        inputRef={register({ required: true })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircleOutlined />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        sx={{ marginBottom: 1.2 }}
        error={!!errors.password}
        helperText={errors.password ? errors.password.message || '请输入密码' : ' '}
        label="密码"
        name="password"
        fullWidth
        placeholder="密码"
        inputRef={register({ required: true })}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlined />
            </InputAdornment>
          ),
        }}
      />
      {captcha && (
        <TextField
          sx={{ marginBottom: 1.2 }}
          error={!!errors.captcha}
          helperText={errors.captcha ? errors.captcha.message || '请输入验证码' : ' '}
          label="验证码"
          name="captcha"
          fullWidth
          placeholder="验证码"
          inputRef={register({ required: true })}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Visibility />
              </InputAdornment>
            ),
            endAdornment: <img alt={'验证码'} onClick={updateCaptcha} src={captcha.image} />,
          }}
        />
      )}

      <LoadingButton pending={loading} type={'submit'} fullWidth>
        确 定
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
