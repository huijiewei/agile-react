import ContentLayout from '@admin/layouts/ContentLayout';
import { useParams } from 'react-router-dom';
import { AdminGroup, useAdminGroupView } from '@admin/services/useAdminGroup';
import { AdminGroupFrom } from '@admin/views/admin-group/_Form';
import { useToast } from '@chakra-ui/react';

const AdminGroupEdit = () => {
  const toast = useToast();
  const { id } = useParams();

  const { data } = useAdminGroupView(id);

  const onSuccess = (adminGroup: AdminGroup) => {
    toast({
      position: 'top',
      description: '管理组编辑成功',
      status: 'success',
      duration: 2000,
      variant: 'subtle',
    });
  };

  return <ContentLayout>{data && <AdminGroupFrom onSuccess={onSuccess} adminGroup={data} />}</ContentLayout>;
};

export default AdminGroupEdit;
