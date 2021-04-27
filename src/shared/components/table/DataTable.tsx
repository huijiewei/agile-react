import { PropsWithChildren } from 'react';
import { Spinner, Table, TableProps, Td, Tr } from '@chakra-ui/react';

type DataTableProps = TableProps & {
  isLoading: boolean;
};

const DataTable = (props: PropsWithChildren<DataTableProps>): JSX.Element => {
  const { children, isLoading, ...restProps } = props;

  return (
    <>
      {children}
      {isLoading && (
        <Table {...restProps}>
          <Tr>
            <Td color={'gray.500'} textAlign={'center'} height={32}>
              <Spinner
                speed={'1s'}
                marginBottom={'-2.5px'}
                marginEnd={2}
                color={'blue.400'}
                emptyColor={'gray.200'}
                size="sm"
                label={'正在加载'}
              />
              正在加载...
            </Td>
          </Tr>
        </Table>
      )}
    </>
  );
};

export { DataTable };
