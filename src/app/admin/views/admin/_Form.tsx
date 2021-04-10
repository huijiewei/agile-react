import { Admin, useAdminSubmit } from '@admin/services/useAdmin';
import { useForm } from 'react-hook-form';
import { Form } from '@shared/components/form/Form';
import { Button, FormErrorMessage, Input, Select } from '@chakra-ui/react';
import { FormItem } from '@shared/components/form/FormItem';
import { RemoteSelect } from '@admin/components/RemoteSelect';
import { useAdminGroups } from '@admin/services/useMisc';
import { AdminGroup } from '@admin/services/useAdminGroup';
import { FormAction } from '@shared/components/form/FormAction';
import { AdminDeleteButton } from '@admin/views/admin/_Delete';
import { useNavigate } from 'react-router-dom';
import { bindUnprocessableEntityErrors } from '@shared/utils/http';
import { useAuth } from '@admin/services/useAuth';
import { timeout } from '@shared/utils/util';

type AdminFromProps = {
  admin: Admin;
  onSuccess: (admin: Admin) => void;
};

const AdminFrom = ({ admin, onSuccess }: AdminFromProps) => {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const navigate = useNavigate();
  const { fetch } = useAdminGroups();
  const { loading, submitAdmin } = useAdminSubmit();
  const { currentUser } = useAuth();

  const loadAdminGroups = async (callback: (adminGroups: AdminGroup[]) => void) => {
    const { data } = await fetch();

    if (data) {
      callback(data);
    }
  };

  const onSubmit = async (formData: Admin & { password: string; passwordConfirm: string }) => {
    const { data, error } = await submitAdmin(admin.id, formData);

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
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormItem id="phone" isRequired label={'手机号码：'} isInvalid={errors.phone} fieldWidth={9}>
        <Input type={'text'} {...register('phone', { required: '请输入手机号码' })} defaultValue={admin.phone} />
        <FormErrorMessage>{errors.phone?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="email" isRequired label={'邮箱：'} isInvalid={errors.email} fieldWidth={9}>
        <Input type={'text'} {...register('email', { required: '请输入邮箱' })} defaultValue={admin.email} />
        <FormErrorMessage>{errors.email?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="password" isRequired label={'密码：'} isInvalid={errors.password} fieldWidth={6}>
        <Input type={'password'} {...register('password', { required: admin.id > 0 ? false : '请输入密码' })} />
        <FormErrorMessage>{errors.password?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="passwordConfirm" isRequired label={'确认密码：'} isInvalid={errors.passwordConfirm} fieldWidth={6}>
        <Input
          type={'password'}
          {...register('passwordConfirm', { required: admin.id > 0 ? false : '请输入确认密码' })}
        />
        <FormErrorMessage>{errors.passwordConfirm?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="name" label={'姓名：'} isInvalid={errors.name} fieldWidth={5}>
        <Input type={'text'} {...register('name', { required: false })} defaultValue={admin.name} />
        <FormErrorMessage>{errors.name?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="avatar" label={'头像：'} isInvalid={errors.avatar} fieldWidth={5}>
        <Input type={'text'} {...register('avatar', { required: false })} defaultValue={admin.avatar} />
        <FormErrorMessage>{errors.avatar?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormItem id="adminGroupId" isRequired label={'管理组：'} isInvalid={errors.adminGroupId} fieldWidth={5}>
        <RemoteSelect
          isDisabled={currentUser?.id == admin.id}
          placeholder={'所属管理组'}
          optionValue={'id'}
          optionLabel={'name'}
          remoteMethod={loadAdminGroups}
          {...register('adminGroupId', { required: '请选择管理组' })}
          defaultValue={admin.adminGroupId}
        />
        <FormErrorMessage>{errors.adminGroupId?.message || ' '}</FormErrorMessage>
      </FormItem>
      <FormAction>
        <Button isLoading={loading} type={'submit'}>
          提交
        </Button>
        {admin.id > 0 && (
          <AdminDeleteButton
            size={'sm'}
            admin={admin}
            onSuccess={() => {
              navigate('../../../admin');
            }}
          />
        )}
      </FormAction>
    </Form>
  );
};

export { AdminFrom };
