import ContentLayout from '@admin/layouts/ContentLayout';
import { useParams } from 'react-router-dom';
import { useAdminGroupView } from '@admin/services/useAdminGroup';
import { AdminGroupFrom } from '@admin/views/admin-group/_Form';

const AdminGroupEdit = () => {
  const { id } = useParams();

  const { data } = useAdminGroupView(id);

  return <ContentLayout>{data && <AdminGroupFrom adminGroup={data} />}</ContentLayout>;
};

export default AdminGroupEdit;
