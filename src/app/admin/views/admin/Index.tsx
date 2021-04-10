import ContentLayout from '@admin/layouts/ContentLayout';
import { Avatar, Box, Button, Center, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAdminAll } from '@admin/services/useAdmin';

const AdminList = () => {
  const { admins } = useAdminAll();

  return (
    <>
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            <Th width={90}>Id</Th>
            <Th width={130}>手机号码</Th>
            <Th width={300}>邮箱</Th>
            <Th width={120}>名称</Th>
            <Th width={55} textAlign={'center'}>
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
          {admins &&
            admins.items.map((admin) => (
              <Tr key={admin.id}>
                <Td>{admin.id}</Td>
                <Td>{admin.phone}</Td>
                <Td>{admin.email}</Td>
                <Td>{admin.name}</Td>
                <Td>
                  <Center>
                    <Avatar size="sm" name={admin.name} src={admin.avatar} />
                  </Center>
                </Td>
                <Td textAlign={'center'}>{admin.adminGroup?.name}</Td>
                <Td>{admin.createdAt}</Td>
                <Td sx={{ textAlign: 'right' }}>
                  <Button variant="outline" size="xs" as={Link} to={'edit/' + admin.id}>
                    编辑
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
};

const AdminIndex = () => {
  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <Box>
          <Button as={Link} to={'create'}>
            新建管理员
          </Button>
        </Box>
      </Flex>
      <AdminList />
    </ContentLayout>
  );
};

export default AdminIndex;
