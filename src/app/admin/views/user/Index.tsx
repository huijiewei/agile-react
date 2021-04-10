import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';

import ContentLayout from '@admin/layouts/ContentLayout';
import { User, useUserAll } from '@admin/services/useUser';
import { useHttp } from '@shared/contexts/HttpContext';
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Center,
  Flex,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { Pagination } from '@shared/components/pagination/Pagination';
import { PaginationItem } from '@shared/components/pagination/PaginationItem';
import { useAuthPermission } from '@admin/hooks/useAuthPermission';
import { UserDeleteButton } from '@admin/views/user/_Delete';

const UserList = () => {
  const { data, mutate } = useUserAll();

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
            <Th />
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
                  <ButtonGroup>
                    <UserEditButton user={user} />
                    <UserDeleteButton
                      user={user}
                      onSuccess={async () => {
                        await mutate();
                      }}
                    />
                  </ButtonGroup>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {data && (
        <Pagination
          sx={{ marginTop: 5 }}
          total={data.pages.totalCount}
          page={data.pages.currentPage}
          renderPage={(page) => (
            <PaginationItem as={Link} to={`../user${page.page === 1 ? '' : `?page=${page.page}`}`} {...page} />
          )}
        />
      )}
    </>
  );
};

const UserExportButton = () => {
  const { apiDownload } = useHttp();
  const { setError } = useErrorDispatch();
  const [loading, setLoading] = useState(false);

  const canExportUser = useAuthPermission('user/export');

  const handleDownload = async () => {
    setLoading(true);

    const result = await apiDownload('GET', 'users/export');

    setLoading(false);

    if (!result) {
      setError('下载失败', false);
    }
  };

  return (
    <Button isDisabled={!canExportUser} size="sm" variant="outline" isLoading={loading} onClick={handleDownload}>
      用户导出
    </Button>
  );
};

const UserCreateButton = () => {
  const canCreateUser = useAuthPermission('user/create');

  return (
    <Button isDisabled={!canCreateUser} as={Link} to={'create'}>
      新建用户
    </Button>
  );
};

const UserEditButton = ({ user }: { user: User }) => {
  const canEditUser = useAuthPermission('user/edit');

  return (
    <Button isDisabled={!canEditUser} variant="outline" size="xs" as={Link} to={'edit/' + user.id}>
      编辑
    </Button>
  );
};

const UserIndex = () => {
  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <ButtonGroup alignItems={'center'} spacing={3}>
          <UserCreateButton />
          <UserExportButton />
        </ButtonGroup>
      </Flex>
      <UserList />
    </ContentLayout>
  );
};

export default UserIndex;
