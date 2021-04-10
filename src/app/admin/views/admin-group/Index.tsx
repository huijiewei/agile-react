import ContentLayout from '@admin/layouts/ContentLayout';
import { Box, Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AdminGroup, useAdminGroupAll } from '@admin/services/useAdminGroup';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';

const AdminGroupTable = () => {
  const { data } = useAdminGroupAll();

  return (
    <Table>
      <Thead>
        <Tr>
          <Th width={90}>Id</Th>
          <Th width={150}>名称</Th>
          <Th />
        </Tr>
      </Thead>
      <Tbody>
        {data &&
          data.items.map((adminGroup) => (
            <Tr key={adminGroup.id}>
              <Td>{adminGroup.id}</Td>
              <Td>{adminGroup.name}</Td>
              <Td sx={{ textAlign: 'right' }}>
                <AdminGroupEditButton adminGroup={adminGroup} />
              </Td>
            </Tr>
          ))}
      </Tbody>
    </Table>
  );
};

const AdminGroupEditButton = ({ adminGroup }: { adminGroup: AdminGroup }) => {
  const canEditAdminGroup = useAuthPermission('admin-group/edit');

  return (
    <Button isDisabled={!canEditAdminGroup} variant="outline" size="xs" as={Link} to={'edit/' + adminGroup.id}>
      编辑
    </Button>
  );
};

const AdminGroupCreateButton = () => {
  const canCreateAdminGroup = useAuthPermission('admin-group/create');

  return (
    <Button isDisabled={!canCreateAdminGroup} as={Link} to={'create'}>
      新建管理组
    </Button>
  );
};

const AdminGroupIndex = () => {
  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <Box>
          <AdminGroupCreateButton />
        </Box>
      </Flex>
      <AdminGroupTable />
    </ContentLayout>
  );
};

export default AdminGroupIndex;
