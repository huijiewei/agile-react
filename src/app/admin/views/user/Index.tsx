import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';

import ContentLayout from '@admin/layouts/ContentLayout';
import { useUserAll } from '@admin/services/useUser';
import { useHttp } from '@shared/contexts/HttpContext';
import { Avatar, ButtonGroup, Center, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { PermissionButton } from '@admin/components/PermissionButton';
import { DataPagination } from '@admin/components/DataPagination';

const UserTable = () => {
  const { data } = useUserAll(false);

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th width={'90px'}>Id</Th>
            <Th width={'130px'}>手机号码</Th>
            <Th minW={'320px'}>邮箱</Th>
            <Th width={'120px'}>姓名</Th>
            <Th width={'60px'} textAlign={'center'}>
              头像
            </Th>
            <Th width={'160px'}>注册 IP</Th>
            <Th width={'90px'} textAlign={'center'}>
              注册来源
            </Th>
            <Th width={'160px'}>注册时间</Th>
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
                <Td textAlign={'center'}>{user.createdFrom?.description}</Td>
                <Td>
                  <Text as="pre">{user.createdAt}</Text>
                </Td>
                <Td sx={{ textAlign: 'right' }}>
                  <PermissionButton
                    permission={'user/edit'}
                    variant="outline"
                    size="xs"
                    as={Link}
                    to={'edit/' + user.id}
                  >
                    编辑
                  </PermissionButton>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <DataPagination pages={data?.pages} />
    </>
  );
};

const UserExportButton = () => {
  const { apiDownload } = useHttp();
  const { setError } = useErrorDispatch();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    const result = await apiDownload('GET', 'users/export');

    setLoading(false);

    if (!result) {
      setError('下载失败', false);
    }
  };

  return (
    <PermissionButton
      permission={'user/export'}
      size="sm"
      variant="outline"
      isLoading={loading}
      onClick={handleDownload}
    >
      用户导出
    </PermissionButton>
  );
};

const UserIndex = () => {
  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <ButtonGroup alignItems={'flex-end'} spacing={3}>
          <PermissionButton permission={'user/create'} as={Link} to={'create'}>
            新建用户
          </PermissionButton>
          <UserExportButton />
        </ButtonGroup>
      </Flex>
      <UserTable />
    </ContentLayout>
  );
};

export default UserIndex;
