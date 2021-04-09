import ContentLayout from '@admin/layouts/ContentLayout';
import { AdminGroupFrom } from '@admin/views/admin-group/_Form';
import { AdminGroup } from '@admin/services/useAdminGroup';
import { useToast } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AdminGroupCreate = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const onSuccess = async (adminGroup: AdminGroup) => {
    toast({
      position: 'top',
      description: `管理组${adminGroup.name}新建成功`,
      status: 'success',
      duration: 2000,
      variant: 'subtle',
    });

    navigate('../../admin-group');
  };

  return (
    <ContentLayout>
      <AdminGroupFrom onSuccess={onSuccess} adminGroup={{ id: 0, name: '', permissions: [] }} />
    </ContentLayout>
  );
};

export default AdminGroupCreate;
