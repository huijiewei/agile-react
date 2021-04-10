import { DeleteButton } from '@admin/components/DeleteButton';
import { AdminGroup, useAdminGroupDelete } from '@admin/services/useAdminGroup';
import { PropsWithChildren } from 'react';
import { useMessage } from '@shared/hooks/useMessage';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';

type AdminGroupDeleteButtonProps = { size?: 'sm' | 'xs'; adminGroup: AdminGroup; onSuccess: () => void };

const AdminGroupDeleteButton = (props: PropsWithChildren<AdminGroupDeleteButtonProps>) => {
  const { loading, deleteAdminGroup } = useAdminGroupDelete();
  const { success } = useMessage();

  const canDeleteAdminGroup = useAuthPermission('admin-group/delete');

  const { children = '删除', size = 'xs', adminGroup, onSuccess } = props;

  return (
    <DeleteButton
      isDisabled={!canDeleteAdminGroup}
      isLoading={loading}
      size={size}
      message={
        <>
          删除管理组 <strong>{adminGroup.name}</strong>
        </>
      }
      onDelete={async () => {
        return await deleteAdminGroup(adminGroup.id);
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

export { AdminGroupDeleteButton };
