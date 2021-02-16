import { useForm } from 'react-hook-form';
import { VFC } from 'react';

const LoginForm: VFC = () => {
  const { register, handleSubmit, errors, formState } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <button type={'submit'}>确 定</button>
    </form>
  );
};

export default LoginForm;
