import ContentLayout from '@admin/layouts/ContentLayout';
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Table,
  Tag,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { AdminLog, useAdminLogAll } from '@admin/services/useAdminLog';
import { SearchForm, useSearchForm } from '@admin/components/SearchForm';
import { DataPagination } from '@admin/components/DataPagination';
import { useEffect, useState } from 'react';
import { SearchField } from '@admin/services/types';
import { DataTable } from '@shared/components/table/DataTable';
import { tabledObject, tabledObjectResult } from '@shared/utils/util';

const AdminLogTable = ({
  setSearchFields,
  withSearchFields,
}: {
  setSearchFields?: (searchFields: SearchField[] | undefined) => void;
  withSearchFields: boolean;
}) => {
  const { data, loading } = useAdminLogAll(withSearchFields);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [adminLogState, setAdminLogState] = useState<tabledObjectResult[] | undefined>();

  useEffect(() => {
    setSearchFields && setSearchFields(data?.searchFields);
  }, [data?.searchFields, setSearchFields]);

  const onClickDetails = (adminLog: AdminLog) => {
    setAdminLogState(
      tabledObject(adminLog, [
        {
          name: 'Id',
          property: 'id',
        },
        {
          name: '管理员',
          property: 'admin',
          callback: (admin) => {
            return admin.name || admin.phone;
          },
        },
        {
          name: '状态',
          property: 'status',
          callback: (status) => {
            return status.description;
          },
        },
        {
          name: '类型',
          property: 'type',
          callback: (type) => {
            return type.description;
          },
        },
        {
          name: '方法',
          property: 'method',
        },
        {
          name: '操作',
          property: 'action',
        },
        {
          name: '参数',
          property: 'params',
        },
        {
          name: '异常信息',
          property: 'exception',
        },
        {
          name: 'IP 地址',
          property: 'remoteAddr',
        },
        {
          name: '浏览器',
          property: 'userAgent',
        },
        {
          name: '创建时间',
          property: 'createdAt',
        },
      ])
    );

    onOpen();
  };

  return (
    <>
      <DataTable isLoading={loading}>
        <Table>
          <Thead>
            <Tr>
              <Th width={90}>Id</Th>
              <Th width={130}>管理员</Th>
              <Th width={70} textAlign={'center'}>
                状态
              </Th>
              <Th width={70} textAlign={'center'}>
                类型
              </Th>
              <Th width={70} textAlign={'center'}>
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
                    <Tag colorScheme={adminLog.status.value == 1 ? 'green' : 'red'}>{adminLog.status.description}</Tag>
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
                    <Button onClick={() => onClickDetails(adminLog)} size={'xs'} variant={'outline'}>
                      详情
                    </Button>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </DataTable>
      <DataPagination pages={data?.pages} />
      <Modal isOpen={isOpen} onClose={onClose} size={'3xl'}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>日志详情</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Table>
              <Tbody>
                {adminLogState &&
                  adminLogState.map((item) => (
                    <Tr key={item.name}>
                      <Td width={150}>{item.name}</Td>
                      <Td>{item.value}</Td>
                    </Tr>
                  ))}
              </Tbody>
            </Table>
          </ModalBody>
          <ModalFooter />
        </ModalContent>
      </Modal>
    </>
  );
};

const AdminLogIndex = (): JSX.Element => {
  const { searchFields, setSearchFields } = useSearchForm();

  return (
    <ContentLayout>
      <Flex marginBottom="6" justifyContent="space-between">
        <Box />
        <SearchForm searchFields={searchFields} />
      </Flex>
      <AdminLogTable setSearchFields={setSearchFields} withSearchFields={!searchFields} />
    </ContentLayout>
  );
};

export default AdminLogIndex;
