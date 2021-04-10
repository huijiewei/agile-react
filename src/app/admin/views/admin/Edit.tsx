import ContentLayout from '@admin/layouts/ContentLayout';
import { useMessage } from '@shared/hooks/useMessage';
import { useParams } from 'react-router-dom';
import { Admin, useAdminView } from '@admin/services/useAdmin';
import { AdminFrom } from '@admin/views/admin/_Form';

const AdminEdit = () => {
  const { success } = useMessage();
  const { id } = useParams();

  const { admin, mutate } = useAdminView(id);

  const onSuccess = async (admin: Admin) => {
    success(`管理员 ${admin.phone} 编辑成功`);

    await mutate(admin, false);
  };
  return <ContentLayout>{admin && <AdminFrom admin={admin} onSuccess={onSuccess} />}</ContentLayout>;
};

export default AdminEdit;
