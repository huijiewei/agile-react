import { User, useUserSubmit } from '@admin/services/useUser';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Form } from '@shared/components/form/Form';
import { FormItem } from '@shared/components/form/FormItem';
import { Button, ButtonGroup, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';
import { FormAction } from '@shared/components/form/FormAction';
import { bindUnprocessableEntityErrors } from '@shared/utils/http';
import { UserDeleteButton } from '@admin/views/user/_Delete';

type UserFromProps = {
  user: User;
  onSuccess: (user: User) => void;
};

const UserForm = ({ user, onSuccess }: UserFromProps): JSX.Element => {
  const {
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'all' });
  const { loading, submitUser } = useUserSubmit();
  const navigate = useNavigate();

  const isEditMode = user.id > 0;

  const onSubmitForm = async (formData: User & { password: string; passwordConfirm: string }) => {
    const { data, error } = await submitUser(user.id, formData);

    if (data) {
      onSuccess && onSuccess(data);
    }

    if (error) {
      bindUnprocessableEntityErrors(
        error,
        (field, message) => {
          setError(field, { type: 'manual', message: message });
        },
        () => clearErrors
      );
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitForm)}>
      <FormItem id="phone" isRequired label={'手机号码：'} isInvalid={errors.phone} fieldWidth={9}>
        <Input type={'tel'} {...register('phone', { required: '请输入手机号码' })} defaultValue={user.phone} />
        <FormErrorMessage>{errors.phone?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="email" isRequired label={'邮箱：'} isInvalid={errors.email} fieldWidth={9}>
        <Input type={'email'} {...register('email', { required: '请输入邮箱' })} defaultValue={user.email} />
        <FormErrorMessage>{errors.email?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="password" isRequired={!isEditMode} label={'密码：'} isInvalid={errors.password} fieldWidth={6}>
        <Input type={'password'} {...register('password', { required: isEditMode ? false : '请输入密码' })} />
        <FormErrorMessage>{errors.password?.message || ' '}</FormErrorMessage>
        {isEditMode && <FormHelperText>密码留空表示不修改密码</FormHelperText>}
      </FormItem>
      <FormItem
        id="passwordConfirm"
        isRequired={!isEditMode}
        label={'确认密码：'}
        isInvalid={errors.passwordConfirm}
        fieldWidth={6}
      >
        <Input
          type={'password'}
          {...register('passwordConfirm', {
            required: isEditMode ? false : '请输入确认密码',
            validate: (value) => value === getValues().password || '确认密码与密码不一致',
          })}
        />
        <FormErrorMessage>{errors.passwordConfirm?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="name" label={'姓名：'} isInvalid={errors.name} fieldWidth={5}>
        <Input type={'text'} {...register('name', { required: false })} defaultValue={user.name} />
        <FormErrorMessage>{errors.name?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="avatar" label={'头像：'} isInvalid={errors.avatar} fieldWidth={5}>
        <Input type={'text'} {...register('avatar', { required: false })} defaultValue={user.avatar} />
        <FormErrorMessage>{errors.avatar?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormAction>
        <ButtonGroup spacing={3} alignItems={'flex-end'}>
          <Button isLoading={loading} type={'submit'}>
            {isEditMode ? '编辑' : '新建'}
          </Button>
          {isEditMode && (
            <UserDeleteButton
              size={'sm'}
              user={user}
              onSuccess={() => {
                navigate('../../../user');
              }}
            />
          )}
        </ButtonGroup>
      </FormAction>
    </Form>
  );
};

export { UserForm };
