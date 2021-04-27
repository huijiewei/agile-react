import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ContentLayout from '@admin/layouts/ContentLayout';
import { useUserAll } from '@admin/services/useUser';
import { Avatar, ButtonGroup, Center, Flex, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { PermissionButton } from '@admin/components/PermissionButton';
import { DataPagination } from '@admin/components/DataPagination';
import { SearchForm, useSearchForm } from '@admin/components/SearchForm';
import { SearchField } from '@admin/services/types';
import { UserExportButton } from '@admin/views/user/_Export';
import { DataTable } from '@shared/components/table/DataTable';

const UserTable = ({
  setSearchFields,
  withSearchFields,
}: {
  setSearchFields?: (searchFields: SearchField[] | undefined) => void;
  withSearchFields: boolean;
}) => {
  const { data, loading } = useUserAll(withSearchFields);

  useEffect(() => {
    setSearchFields && setSearchFields(data?.searchFields);
  }, [data?.searchFields, setSearchFields]);

  return (
    <>
      <DataTable isLoading={loading}>
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
      </DataTable>
      <DataPagination pages={data?.pages} />
    </>
  );
};

const UserIndex = (): JSX.Element => {
  const { searchFields, setSearchFields } = useSearchForm();

  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <ButtonGroup alignItems={'flex-end'} spacing={3}>
          <PermissionButton permission={'user/create'} as={Link} to={'create'}>
            新建用户
          </PermissionButton>
          <UserExportButton />
        </ButtonGroup>
        <SearchForm searchFields={searchFields} />
      </Flex>
      <UserTable setSearchFields={setSearchFields} withSearchFields={!searchFields} />
    </ContentLayout>
  );
};

export default UserIndex;
