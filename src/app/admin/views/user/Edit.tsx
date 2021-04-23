import { useParams } from 'react-router-dom';
import ContentLayout from '@admin/layouts/ContentLayout';
import { User, useUserView } from '@admin/services/useUser';
import { UserForm } from '@admin/views/user/_Form';
import { useMessage } from '@shared/hooks/useMessage';

const UserEdit = (): JSX.Element => {
  const { success } = useMessage();
  const { id } = useParams();

  const { data, mutate } = useUserView(id);

  const onSuccess = async (user: User) => {
    success(`用户 ${user.phone} 编辑成功`);

    await mutate(user, false);
  };

  return <ContentLayout>{data && <UserForm user={data} onSuccess={onSuccess} />}</ContentLayout>;
};

export default UserEdit;
