import ContentLayout from '@admin/layouts/ContentLayout';
import { useMessage } from '@shared/hooks/useMessage';
import { useParams } from 'react-router-dom';
import { Admin, useAdminView } from '@admin/services/useAdmin';
import { AdminFrom } from '@admin/views/admin/_Form';

const AdminEdit = (): JSX.Element => {
  const { success } = useMessage();
  const { id } = useParams();

  const { data, mutate } = useAdminView(id);

  const onSuccess = async (admin: Admin) => {
    success(`管理员 ${admin.phone} 编辑成功`);

    await mutate(admin, false);
  };

  return <ContentLayout>{data && <AdminFrom admin={data} onSuccess={onSuccess} />}</ContentLayout>;
};

export default AdminEdit;
