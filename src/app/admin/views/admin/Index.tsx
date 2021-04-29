import ContentLayout from '@admin/layouts/ContentLayout';
import { Avatar, Box, Center, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAdminAll } from '@admin/services/useAdmin';
import { PermissionButton } from '@admin/components/PermissionButton';
import { DataTable } from '@shared/components/table/DataTable';

const AdminTable = (): JSX.Element => {
  const { data, loading } = useAdminAll();

  return (
    <DataTable isLoading={loading}>
      <Table>
        <Thead>
          <Tr>
            <Th width={90}>Id</Th>
            <Th width={130}>手机号码</Th>
            <Th width={300}>邮箱</Th>
            <Th width={120}>名称</Th>
            <Th width={69} textAlign={'center'}>
              头像
            </Th>
            <Th width={120} textAlign={'center'}>
              所属管理组
            </Th>
            <Th>创建时间</Th>
            <Th width={150} />
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.items.map((admin) => (
              <Tr key={admin.id}>
                <Td>{admin.id}</Td>
                <Td>{admin.phone}</Td>
                <Td>{admin.email}</Td>
                <Td>{admin.name}</Td>
                <Td>
                  <Center>
                    <Avatar
                      onError={() => {
                        console.log('error');
                      }}
                      size="sm"
                      name={admin.name}
                      src={admin.avatar}
                    />
                  </Center>
                </Td>
                <Td textAlign={'center'}>{admin.adminGroup?.name}</Td>
                <Td>{admin.createdAt}</Td>
                <Td sx={{ textAlign: 'right' }}>
                  <PermissionButton
                    permission={'admin/edit'}
                    as={Link}
                    variant="outline"
                    size="xs"
                    to={'edit/' + admin.id}
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

const AdminIndex = (): JSX.Element => {
  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <Box>
          <PermissionButton permission={'admin/create'} as={Link} to={'create'}>
            新建管理员
          </PermissionButton>
        </Box>
      </Flex>
      <AdminTable />
    </ContentLayout>
  );
};

export default AdminIndex;
