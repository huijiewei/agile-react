import ContentLayout from '@admin/layouts/ContentLayout';
import { useMessage } from '@shared/hooks/useMessage';
import { useNavigate } from 'react-router-dom';
import { User } from '@admin/services/useUser';
import { UserForm } from '@admin/views/user/_Form';

const UserCreate = () => {
  const { success } = useMessage();
  const navigate = useNavigate();

  const onSuccess = async (user: User) => {
    success(`用户 ${user.phone} 新建成功`);

    navigate('../../user');
  };

  const user = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    avatar: '',
  };
  return (
    <ContentLayout>
      <UserForm user={user} onSuccess={onSuccess} />
    </ContentLayout>
  );
};

export default UserCreate;
