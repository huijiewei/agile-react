import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';

import ContentLayout from '@admin/layouts/ContentLayout';
import { useUserAll } from '@admin/services/useUser';
import { useHttp } from '@shared/contexts/HttpContext';
import { Button, Table, Tbody, Thead, Tr, Th, Td, Center, Avatar, Text, Flex, Stack, Box } from '@chakra-ui/react';
import { Pagination } from '@shared/components/pagination/Pagination';
import { PaginationItem } from '@shared/components/pagination/PaginationItem';

const UserList = () => {
  const { data } = useUserAll();

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>手机号码</Th>
            <Th>邮箱</Th>
            <Th>姓名</Th>
            <Th sx={{ textAlign: 'center' }}>头像</Th>
            <Th>注册 IP</Th>
            <Th>注册来源</Th>
            <Th>注册时间</Th>
            <Th sx={{ textAlign: 'right' }}>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.items.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>
                  <Text as="pre">{user.phone}</Text>
                </Td>
                <Td>{user.email}</Td>
                <Td>{user.name}</Td>
                <Td>
                  <Center>
                    <Avatar size="sm" name={user.name} src={user.avatar} />
                  </Center>
                </Td>
                <Td>
                  <Text as="pre">{user.createdIp}</Text>
                </Td>
                <Td>{user.createdFrom.description}</Td>
                <Td>
                  <Text as="pre">{user.createdAt}</Text>
                </Td>
                <Td sx={{ textAlign: 'right' }}>
                  <Button variant="outline" size="xs" as={Link} to={'edit/' + user.id}>
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
      {data && (
        <Pagination
          total={data.pages.totalCount}
          page={data.pages.currentPage}
          renderPage={(page) => (
            <PaginationItem
              as={Link}
              to={`../user${page.page === 1 ? '' : `?page=${page.page}`}`}
              {...page}
            ></PaginationItem>
          )}
        ></Pagination>
      )}
    </>
  );
};

const UserDownload = () => {
  const { download } = useHttp();
  const { setError } = useErrorDispatch();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    const result = await download('GET', 'users/export');

    setLoading(false);

    if (!result) {
      setError('下载失败', false);
    }
  };

  return (
    <Button size="sm" variant="outline" isLoading={loading} onClick={handleDownload}>
      用户导出
    </Button>
  );
};

const UserIndex = () => {
  console.log('UserIndex Render');

  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <Box>
          <Button as={Link} to={'create'}>
            新建用户
          </Button>
          &nbsp;&nbsp;&nbsp;
          <UserDownload />
        </Box>
      </Flex>
      <UserList />
    </ContentLayout>
  );
};

export default UserIndex;
