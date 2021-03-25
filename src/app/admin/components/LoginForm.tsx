import { useForm } from 'react-hook-form';
import { useState } from 'react';

import { useAuthLoginDispatch } from '@shared/contexts/AuthLoginContext';
import { setAuthAccessToken } from '@admin/AppAuth';
import { Auth, setAuth } from '@admin/services/useAuth';
import { useHttp } from '@shared/contexts/HttpContext';
import { bindUnprocessableEntityErrors, requestFlatry } from '@shared/utils/http';

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
  const { resetLoginAction } = useAuthLoginDispatch();
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

      resetLoginAction();

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <label id="account">
        <div>
          <input
            name="account"
            ref={register({ required: '请输入帐号' })}
            type="text"
            placeholder="手机号码或者电子邮箱"
          />
        </div>
        <span>{errors.account?.message || ' '}</span>
      </label>
      <label id="password">
        <div>
          <input name="password" ref={register({ required: '请输入密码' })} type="password" placeholder="密码" />
        </div>
        <span>{errors.password?.message || ' '}</span>
      </label>
      {captcha && (
        <label id="captcha">
          <div>
            <input name="captcha" ref={register({ required: '请输入验证码' })} type="text" placeholder="验证码" />
            <span>
              <img alt={'验证码'} onClick={updateCaptcha} src={captcha.image} />
            </span>
          </div>
          <span>{errors.captcha?.message || ' '}</span>
        </label>
      )}

      <button disabled={loading} type={'submit'}>
        确 定
      </button>
    </form>
  );
};

export { LoginForm };
