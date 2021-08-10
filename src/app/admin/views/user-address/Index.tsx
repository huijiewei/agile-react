import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import ContentLayout from '@admin/layouts/ContentLayout';
import { Avatar, Box, Flex, Stack, Table, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { PermissionButton } from '@admin/components/PermissionButton';
import { DataPagination } from '@admin/components/DataPagination';
import { SearchForm, useSearchForm } from '@admin/components/SearchForm';
import { SearchField } from '@admin/services/types';
import { DataTable } from '@shared/components/table/DataTable';
import { useUserAddressAll } from '@admin/services/useUserAddress';

const UserAddressTable = ({
  setSearchFields,
  withSearchFields,
}: {
  setSearchFields?: (searchFields: SearchField[] | undefined) => void;
  withSearchFields: boolean;
}) => {
  const { data, loading } = useUserAddressAll(withSearchFields);

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
              <Th width={'130px'}>地址别名</Th>
              <Th width={'130px'}>联系人</Th>
              <Th width={'130px'}>联系电话</Th>
              <Th width={'150px'}>用户</Th>
              <Th width={'390px'}>区域地址</Th>
              <Th width={'200px'}>详细地址</Th>
              <Th />
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data.items.map((userAddress) => (
                <Tr key={userAddress.id}>
                  <Td>{userAddress.id}</Td>
                  <Td>{userAddress.alias}</Td>
                  <Td>{userAddress.name}</Td>
                  <Td>
                    <Text as="pre">{userAddress.phone}</Text>
                  </Td>
                  <Td>
                    <Stack isInline alignItems={'center'}>
                      <Avatar size="sm" name={userAddress.user.name} src={userAddress.user.avatar} />
                      <Text>{userAddress.user.name}</Text>
                    </Stack>
                  </Td>
                  <Td>{userAddress.districtAddress}</Td>
                  <Td>{userAddress.address}</Td>
                  <Td sx={{ textAlign: 'right' }}>
                    <PermissionButton
                      permission={'user-address/edit'}
                      variant="outline"
                      size="xs"
                      as={Link}
                      to={'edit/' + userAddress.id}
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

const UserAddressIndex = (): JSX.Element => {
  const { searchFields, setSearchFields } = useSearchForm();

  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <Box />
        <SearchForm searchFields={searchFields} />
      </Flex>
      <UserAddressTable setSearchFields={setSearchFields} withSearchFields={!searchFields} />
    </ContentLayout>
  );
};

export default UserAddressIndex;
