import ContentLayout from '@admin/layouts/ContentLayout';
import { Box, Button, Flex, Table, Tag, Tbody, Td, Text, Th, Thead, Tr } from '@chakra-ui/react';
import { useAdminLogAll } from '@admin/services/useAdminLog';
import { SearchForm, useSearchForm } from '@admin/components/SearchForm';
import { DataPagination } from '@admin/components/DataPagination';
import { useCallback, useEffect } from 'react';
import { SearchField } from '@admin/services/types';

const AdminLogTable = ({
  onApiFetch,
  withSearchFields,
}: {
  onApiFetch?: (searchFields: SearchField[] | undefined) => void;
  withSearchFields: boolean;
}) => {
  const { data } = useAdminLogAll(withSearchFields);

  console.log('AdminLogTable');

  useEffect(() => {
    onApiFetch && onApiFetch(data?.searchFields);
  }, [data?.searchFields, onApiFetch]);

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th width={90}>Id</Th>
            <Th width={130}>管理员</Th>
            <Th width={65} textAlign={'center'}>
              状态
            </Th>
            <Th width={75} textAlign={'center'}>
              类型
            </Th>
            <Th width={75} textAlign={'center'}>
              方法
            </Th>
            <Th width={300}>操作</Th>
            <Th>参数</Th>
            <Th width={150}>IP 地址</Th>
            <Th width={160}>创建时间</Th>
            <Th width={'60px'} />
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.items.map((adminLog) => (
              <Tr key={adminLog.id}>
                <Td>{adminLog.id}</Td>
                <Td>{adminLog.admin.name || adminLog.admin.phone}</Td>
                <Td textAlign={'center'}>
                  <Tag variant={'solid'} colorScheme={adminLog.status.value == 1 ? 'green' : 'red'}>
                    {adminLog.status.description}
                  </Tag>
                </Td>
                <Td textAlign={'center'}>{adminLog.type.description}</Td>
                <Td textAlign={'center'}>{adminLog.method}</Td>
                <Td>{adminLog.action}</Td>
                <Td wordBreak={'break-all'}>{adminLog.params}</Td>
                <Td>
                  <Text as="pre">{adminLog.remoteAddr}</Text>
                </Td>
                <Td>
                  <Text as="pre">{adminLog.createdAt}</Text>
                </Td>
                <Td textAlign={'right'}>
                  <Button size={'xs'} variant={'outline'}>
                    详情
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      <DataPagination pages={data?.pages} />
    </>
  );
};

const AdminLogIndex = () => {
  const { searchFields, setSearchFields } = useSearchForm();

  const onApiFetch = useCallback(
    (searchFields: SearchField[] | undefined) => {
      setSearchFields(searchFields);
    },
    [setSearchFields]
  );

  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <Box />
        <SearchForm searchFields={searchFields} />
      </Flex>
      <AdminLogTable onApiFetch={onApiFetch} withSearchFields={!searchFields} />
    </ContentLayout>
  );
};

export default AdminLogIndex;
