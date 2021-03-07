import { useForm } from 'react-hook-form';
import { useState, VFC } from 'react';
import Button from '@shared/components/button/Button';

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
      <Button isLoading={loading} loadingText="正在登录" isFullWidth={true} type={'submit'}>
        确 定
      </Button>
    </form>
  );
};

export default LoginForm;
