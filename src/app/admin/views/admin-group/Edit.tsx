import ContentLayout from '@admin/layouts/ContentLayout';
import { useParams } from 'react-router-dom';
import { AdminGroup, useAdminGroupView } from '@admin/services/useAdminGroup';
import { AdminGroupFrom } from '@admin/views/admin-group/_Form';
import { useMessage } from '@shared/hooks/useMessage';

const AdminGroupEdit = (): JSX.Element => {
  const { success } = useMessage();
  const { id } = useParams();

  const { data, mutate } = useAdminGroupView(id);

  const onSuccess = async (adminGroup: AdminGroup) => {
    success(`管理组 ${adminGroup.name} 编辑成功`);

    await mutate(adminGroup, false);
  };

  return <ContentLayout>{data && <AdminGroupFrom onSuccess={onSuccess} adminGroup={data} />}</ContentLayout>;
};

export default AdminGroupEdit;
