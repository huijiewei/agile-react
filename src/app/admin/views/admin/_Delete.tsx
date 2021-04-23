import { DeleteButton } from '@admin/components/DeleteButton';
import { PropsWithChildren } from 'react';
import { useMessage } from '@shared/hooks/useMessage';
import { Admin, useAdminDelete } from '@admin/services/useAdmin';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';

type AdminDeleteButtonProps = { size?: 'sm' | 'xs'; admin: Admin; onSuccess: () => void };

const AdminDeleteButton = (props: PropsWithChildren<AdminDeleteButtonProps>): JSX.Element => {
  const { loading, deleteAdmin } = useAdminDelete();
  const { success } = useMessage();

  const canDeleteAdmin = useAuthPermission('admin/delete');

  const { children = '删除', size = 'xs', admin, onSuccess } = props;

  return (
    <DeleteButton
      isLoading={loading}
      isDisabled={!canDeleteAdmin}
      size={size}
      prompt={{
        label: (
          <>
            输入管理员电话 <strong>{admin.phone}</strong> 以确认删除
          </>
        ),
        value: admin.phone,
      }}
      onDelete={async () => {
        return await deleteAdmin(admin.id);
      }}
      onSuccess={(message: string) => {
        success(message);

        onSuccess();
      }}
    >
      {children}
    </DeleteButton>
  );
};

export { AdminDeleteButton };
