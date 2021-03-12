import { useState, VFC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useRequest from '@shared/hooks/useRequest';
import useSWR from 'swr';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { Button, Stack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
const UserList: VFC = () => {
  const { httpGet } = useRequest();
  const [searchParams] = useSearchParams();

  console.log(searchParams);

  const { data } = useSWR('users?' + searchParams.toString(), async (url) => {
    return await httpGet(url);
  });

  console.log('UserList Render');

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>手机号码</Th>
            <Th>邮箱</Th>
            <Th>姓名</Th>
            <Th>头像</Th>
            <Th>注册 IP</Th>
            <Th>注册来源</Th>
            <Th>注册时间</Th>
            <Th>操作</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data &&
            data.items.map((user) => (
              <Tr key={user.id}>
                <Td>{user.id}</Td>
                <Td>{user.phone}</Td>
                <Td>{user.email}</Td>
                <Td>{user.name}</Td>
                <Td>
                  <img style={{ height: '32px', width: '32px' }} alt={user.name} src={user.avatar} />
                </Td>
                <Td>{user.createdIp}</Td>
                <Td>{user.createdFrom.description}</Td>
                <Td>{user.createdAt}</Td>
                <Td>
                  <Link to={'edit/' + user.id}>编辑</Link>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {data && data.pages && <Stack></Stack>}
    </>
  );
};

const UserDownload: VFC = () => {
  const { httpDownload } = useRequest();
  const { setError } = useErrorDispatch();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    const result = await httpDownload('GET', 'users/export');

    setLoading(false);

    if (!result) {
      setError('下载失败', false);
    }
  };

  return (
    <Button size={'sm'} variant={'outlined'} isLoading={loading} onClick={handleDownload}>
      用户导出
    </Button>
  );
};

const UserIndex: VFC = () => {
  console.log('UserIndex Render');

  return (
    <div className={'ag-box'}>
      <h5>UserIndex</h5>
      <p>
        <Link to={'create'}>新建用户</Link>
      </p>
      <p>
        <Link to={'../user'}>Index</Link>
      </p>
      <p>
        <Link to={{ pathname: '../user', search: '?page=9&phone=139' }}>跳到搜索139号码的第9页</Link>
      </p>
      <p>
        <UserDownload />
      </p>
      <UserList />
    </div>
  );
};

export default UserIndex;
