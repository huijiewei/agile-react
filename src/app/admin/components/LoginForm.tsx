import { useForm } from 'react-hook-form';
import { useState, VFC } from 'react';
import { Button } from '@chakra-ui/react';
import { flatry } from '@shared/utils/util';
import { useAuthTokenDispatch } from '@shared/contexts/AuthTokenContext';
import useRequest from '@shared/hooks/useRequest';
import { useAuthUserDispatch } from '@admin/contexts/AuthUserContext';
import { useNavigate } from 'react-router-dom';
import { useAuthLoginDispatch } from '@shared/contexts/AuthLoginContext';

const LoginForm: VFC = () => {
  const { register, handleSubmit, errors, formState } = useForm();
  const [loading, setLoading] = useState(false);
  const { setAccessToken } = useAuthTokenDispatch();
  const { httpPost } = useRequest();
  const setAuthUser = useAuthUserDispatch();
  const navigator = useNavigate();
  const { resetLoginAction } = useAuthLoginDispatch();

  const onSubmit = async (form) => {
    console.log(form);

    setLoading(true);

    const { data } = await flatry(httpPost('auth/login', { account: '13012345678', password: 'soarman' }));

    if (data) {
      setAccessToken(data.accessToken);
      setAuthUser(data.currentUser, data.groupMenus, data.groupPermissions);

      resetLoginAction();

      navigator('../home', { replace: true });
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
