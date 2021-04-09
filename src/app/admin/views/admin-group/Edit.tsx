import ContentLayout from '@admin/layouts/ContentLayout';
import { useParams } from 'react-router-dom';
import { AdminGroup, useAdminGroupView } from '@admin/services/useAdminGroup';
import { AdminGroupFrom } from '@admin/views/admin-group/_Form';
import { useToast } from '@chakra-ui/react';

const AdminGroupEdit = () => {
  const toast = useToast();
  const { id } = useParams();

  const { adminGroup, mutate } = useAdminGroupView(id);

  const onSuccess = async (adminGroup: AdminGroup) => {
    toast({
      position: 'top',
      description: `管理组${adminGroup.name}编辑成功`,
      status: 'success',
      duration: 2000,
      variant: 'subtle',
    });

    await mutate(adminGroup, false);
  };

  return (
    <ContentLayout>{adminGroup && <AdminGroupFrom onSuccess={onSuccess} adminGroup={adminGroup} />}</ContentLayout>
  );
};

export default AdminGroupEdit;
