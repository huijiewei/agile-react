import ContentLayout from '@admin/layouts/ContentLayout';
import { Box, Button, Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { useAdminGroupAll } from '@admin/services/useAdminGroup';

const AdminGroupList = () => {
  const { data } = useAdminGroupAll();

  return (
    <>
      <Table variant={'striped'}>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>名称</Th>
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
                  <Button variant="outline" size="xs" as={Link} to={'edit/' + adminGroup.id}>
                    编辑
                  </Button>
                  &nbsp;&nbsp;
                  <Button colorScheme="red" variant="outline" size="xs">
                    删除
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
    </>
  );
};

const AdminGroupIndex = () => {
  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <Box>
          <Button as={Link} to={'create'}>
            新建管理组
          </Button>
        </Box>
      </Flex>
      <AdminGroupList />
    </ContentLayout>
  );
};

export default AdminGroupIndex;
