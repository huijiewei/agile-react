import ContentLayout from '@admin/layouts/ContentLayout';
import { AdminGroupFrom } from '@admin/views/admin-group/_Form';
import { AdminGroup } from '@admin/services/useAdminGroup';
import { useNavigate } from 'react-router-dom';
import { useMessage } from '@shared/hooks/useMessage';

const AdminGroupCreate = (): JSX.Element => {
  const { success } = useMessage();
  const navigate = useNavigate();

  const onSuccess = async (adminGroup: AdminGroup) => {
    success(`管理组 ${adminGroup.name} 新建成功`);

    navigate('../../admin-group');
  };

  const adminGroup = { id: 0, name: '', permissions: [] };

  return (
    <ContentLayout>
      <AdminGroupFrom onSuccess={onSuccess} adminGroup={adminGroup} />
    </ContentLayout>
  );
};

export default AdminGroupCreate;
