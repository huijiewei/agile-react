import ContentLayout from '@admin/layouts/ContentLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { AdminGroup, useAdminGroupView } from '@admin/services/useAdminGroup';
import { AdminGroupFrom } from '@admin/views/admin-group/_Form';
import { useToast } from '@chakra-ui/react';

const AdminGroupEdit = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data, mutate } = useAdminGroupView(id);

  const onSuccess = async (adminGroup: AdminGroup) => {
    toast({
      position: 'top',
      description: '管理组编辑成功',
      status: 'success',
      duration: 2000,
      variant: 'subtle',
    });

    await mutate(adminGroup, false);

    navigate(`../../../admin-group`);
  };

  return <ContentLayout>{data && <AdminGroupFrom onSuccess={onSuccess} adminGroup={data} />}</ContentLayout>;
};

export default AdminGroupEdit;
