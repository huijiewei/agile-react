import ContentLayout from '@admin/layouts/ContentLayout';
import { AdminFrom } from '@admin/views/admin/_Form';
import { Admin } from '@admin/services/useAdmin';
import { useMessage } from '@shared/hooks/useMessage';
import { useNavigate } from 'react-router-dom';

const AdminCreate = (): JSX.Element => {
  const { success } = useMessage();
  const navigate = useNavigate();

  const onSuccess = async (admin: Admin) => {
    success(`管理员 ${admin.phone} 新建成功`);

    navigate('../../admin');
  };

  const admin = {
    id: 0,
    name: '',
    phone: '',
    email: '',
    avatar: '',
    adminGroupId: 0,
  };

  return (
    <ContentLayout>
      <AdminFrom admin={admin} onSuccess={onSuccess} />
    </ContentLayout>
  );
};

export default AdminCreate;
