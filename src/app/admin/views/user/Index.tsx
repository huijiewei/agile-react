import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useRequest from '@shared/hooks/useRequest';
import useSWR from 'swr';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import { Avatar, Button, Stack, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';
import ContentLayout from '@admin/layouts/ContentLayout';

const UserList = () => {
  const { httpGet } = useRequest();
  const [searchParams] = useSearchParams();

  const { data } = useSWR('users?' + searchParams.toString(), (url) => httpGet(url));

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>Id</Th>
            <Th>手机号码</Th>
            <Th>邮箱</Th>
            <Th>姓名</Th>
            <Th textAlign={'center'}>头像</Th>
            <Th>注册 IP</Th>
            <Th textAlign={'center'}>注册来源</Th>
            <Th>注册时间</Th>
            <Th textAlign={'right'}>操作</Th>
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
                <Td textAlign={'center'}>
                  <Avatar size={'sm'} name={user.name} src={user.avatar} />
                </Td>
                <Td>{user.createdIp}</Td>
                <Td textAlign={'center'}>{user.createdFrom.description}</Td>
                <Td>{user.createdAt}</Td>
                <Td textAlign={'right'}>
                  <Button as={Link} size={'xs'} variant={'outline'} to={'edit/' + user.id}>
                    编辑
                  </Button>
                  &nbsp;
                  <Button colorScheme={'red'} size={'xs'} variant={'outline'}>
                    删除
                  </Button>
                </Td>
              </Tr>
            ))}
        </Tbody>
      </Table>
      {data && data.pages && <Stack></Stack>}
    </>
  );
};

const UserDownload = () => {
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
    <Button size={'sm'} variant={'outline'} isLoading={loading} onClick={handleDownload}>
      用户导出
    </Button>
  );
};

const UserIndex = () => {
  console.log('UserIndex Render');

  return (
    <ContentLayout>
      <h5>UserIndex</h5>
      <p>
        <Button as={Link} to={'create'}>
          新建用户
        </Button>
        &nbsp;
        <UserDownload />
      </p>
      <p>
        <Link to={'../user'}>Index</Link>
      </p>
      <p>
        <Link to={{ pathname: '../user', search: '?page=9&phone=139' }}>跳到搜索139号码的第9页</Link>
      </p>
      <p></p>
      <UserList />
    </ContentLayout>
  );
};

export default UserIndex;
