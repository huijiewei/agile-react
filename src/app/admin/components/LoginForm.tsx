import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import { flatry } from '@shared/utils/util';
import useRequest from '@shared/hooks/useRequest';
import { useAuthUserDispatch } from '@admin/contexts/AuthUserContext';
import { useAuthLoginDispatch } from '@shared/contexts/AuthLoginContext';
import { useAuthToken } from '@admin/AppAuthProvider';

interface LoginFormProps {
  onSuccess?: () => void;
}

const LoginForm = ({ onSuccess }: LoginFormProps) => {
  const { register, handleSubmit, errors, formState } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAccessToken } = useAuthToken();
  const { httpPost } = useRequest();
  const { setAuthUser } = useAuthUserDispatch();
  const { resetLoginAction } = useAuthLoginDispatch();

  const onSubmit = async (form) => {
    console.log(form);

    setLoading(true);

    const { data } = await flatry(httpPost('auth/login', { account: '13012345678', password: 'soarman' }));

    if (data) {
      setAccessToken(data.accessToken);
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);

      resetLoginAction();

      onSuccess && onSuccess();
    }

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
