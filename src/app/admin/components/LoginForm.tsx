import { useForm } from 'react-hook-form';
import { useState, VFC } from 'react';
import { Button, InputAdornment, TextField } from '@material-ui/core';
import { AccountCircleOutlined, LockOutlined } from '@material-ui/icons';
import LoadingButton from '@material-ui/lab/LoadingButton';

const LoginForm: VFC = () => {
  const { register, handleSubmit, errors, formState } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);

    setLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        error={!!errors.account}
        helperText={errors.account && '请输入帐号'}
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
        error={!!errors.password}
        helperText={errors.password && '请输入密码'}
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
      <LoadingButton pending={loading} pendingIndicator="正在登录" fullWidth type={'submit'}>
        确 定
      </LoadingButton>
    </form>
  );
};

export default LoginForm;
