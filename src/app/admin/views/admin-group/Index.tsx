import ContentLayout from '@admin/layouts/ContentLayout';
import { Box, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAdminGroupAll } from '@admin/services/useAdminGroup';
import { PermissionButton } from '@admin/components/PermissionButton';
import { DataTable } from '@shared/components/table/DataTable';

const AdminGroupTable = (): JSX.Element => {
  const { data, loading } = useAdminGroupAll();

  return (
    <DataTable isLoading={loading}>
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
                  <PermissionButton
                    permission={'admin-group/edit'}
                    variant="outline"
                    size="xs"
                    as={Link}
                    to={'edit/' + adminGroup.id}
                  >
                    编辑
                  </PermissionButton>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </DataTable>
  );
};

const AdminGroupIndex = (): JSX.Element => {
  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <Box>
          <PermissionButton permission={'admin-group/create'} as={Link} to={'create'}>
            新建管理组
          </PermissionButton>
        </Box>
      </Flex>
      <AdminGroupTable />
    </ContentLayout>
  );
};

export default AdminGroupIndex;
