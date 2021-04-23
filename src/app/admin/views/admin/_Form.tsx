import { Admin, useAdminSubmit } from '@admin/services/useAdmin';
import { Controller, useForm } from 'react-hook-form';
import { Form } from '@shared/components/form/Form';
import { Button, ButtonGroup, FormErrorMessage, FormHelperText, Input } from '@chakra-ui/react';
import { FormItem } from '@shared/components/form/FormItem';
import { RemoteSelect } from '@admin/components/RemoteSelect';
import { useAdminGroups } from '@admin/services/useMisc';
import { FormAction } from '@shared/components/form/FormAction';
import { AdminDeleteButton } from '@admin/views/admin/_Delete';
import { useNavigate } from 'react-router-dom';
import { bindUnprocessableEntityErrors } from '@shared/utils/http';
import { useAuth } from '@admin/services/useAuth';
import { AvatarUpload } from '@admin/components/upload/AvatarUpload';

type AdminFromProps = {
  admin: Admin;
  onSuccess: (admin: Admin) => void;
};

const AdminFrom = ({ admin, onSuccess }: AdminFromProps): JSX.Element => {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const navigate = useNavigate();
  const { fetch } = useAdminGroups();
  const { loading, submitAdmin } = useAdminSubmit();
  const { currentUser, mutate } = useAuth();

  const isEditMode = admin.id > 0;
  const isOwnerMode = currentUser?.id == admin.id;

  const loadAdminGroups = async () => {
    const { data } = await fetch();

    return data?.map((adminGroup) => {
      return {
        value: adminGroup.id,
        label: adminGroup.name,
      };
    });
  };

  const onSubmit = async (formData: Admin & { password: string; passwordConfirm: string }) => {
    const { data, error } = await submitAdmin(admin.id, formData);

    if (data) {
      onSuccess && onSuccess(data);

      if (isOwnerMode) {
        await mutate(undefined, true);
      }
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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem id="phone" isRequired label={'手机号码：'} isInvalid={errors.phone} fieldWidth={9}>
        <Input type={'tel'} {...register('phone', { required: '请输入手机号码' })} defaultValue={admin.phone} />
        <FormErrorMessage>{errors.phone?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="email" isRequired label={'邮箱：'} isInvalid={errors.email} fieldWidth={9}>
        <Input type={'email'} {...register('email', { required: '请输入邮箱' })} defaultValue={admin.email} />
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
            validate: (value) => value == getValues('password') || '确认密码与密码不一致',
          })}
        />
        <FormErrorMessage>{errors.passwordConfirm?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="name" label={'姓名：'} isInvalid={errors.name} fieldWidth={5}>
        <Input type={'text'} {...register('name', { required: false })} defaultValue={admin.name} />
        <FormErrorMessage>{errors.name?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="avatar" label={'头像：'} isInvalid={errors.avatar} fieldWidth={22}>
        <Controller
          control={control}
          defaultValue={admin.avatar}
          name={'avatar'}
          render={({ field: { value, onChange } }) => <AvatarUpload value={value} onChange={onChange} />}
        />
        <FormErrorMessage>{errors.avatar?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem
        id="adminGroupId"
        isRequired={!isOwnerMode}
        label={'管理组：'}
        isInvalid={errors.adminGroupId}
        fieldWidth={5}
      >
        <RemoteSelect
          isDisabled={isOwnerMode}
          placeholder={'所属管理组'}
          loadOptions={loadAdminGroups}
          {...register('adminGroupId', { required: isOwnerMode ? false : '请选择管理组' })}
          defaultValue={admin.adminGroupId}
        />
        <FormErrorMessage>{errors.adminGroupId?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormAction>
        <ButtonGroup spacing={3} alignItems={'flex-end'}>
          <Button isLoading={loading} type={'submit'}>
            {isEditMode ? '编辑' : '新建'}
          </Button>
          {isEditMode && !isOwnerMode && (
            <AdminDeleteButton
              size={'sm'}
              admin={admin}
              onSuccess={() => {
                navigate('../../../admin');
              }}
            />
          )}
        </ButtonGroup>
      </FormAction>
    </Form>
  );
};

export { AdminFrom };
