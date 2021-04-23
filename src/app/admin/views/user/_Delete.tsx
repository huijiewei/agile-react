import { DeleteButton } from '@admin/components/DeleteButton';
import { PropsWithChildren } from 'react';
import { useMessage } from '@shared/hooks/useMessage';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';
import { User, useUserDelete } from '@admin/services/useUser';

type UserDeleteButtonProps = { size?: 'sm' | 'xs'; user: User; onSuccess: () => void };

const UserDeleteButton = (props: PropsWithChildren<UserDeleteButtonProps>): JSX.Element => {
  const { loading, deleteUser } = useUserDelete();
  const { success } = useMessage();

  const canDeleteUser = useAuthPermission('user/delete');

  const { children = '删除', size = 'xs', user, onSuccess } = props;

  return (
    <DeleteButton
      isDisabled={!canDeleteUser}
      isLoading={loading}
      size={size}
      message={
        <>
          删除用户 <strong>{user.phone}</strong>
        </>
      }
      onDelete={async () => {
        return await deleteUser(user.id);
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

export { UserDeleteButton };
