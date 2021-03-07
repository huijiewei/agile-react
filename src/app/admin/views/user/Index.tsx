import { useState, VFC } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import useRequest from '@shared/hooks/useRequest';
import useSWR from 'swr';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import Button from '@shared/components/button/Button';

const UserList: VFC = () => {
  const { httpGet } = useRequest();
  const [searchParams] = useSearchParams();

  const { data } = useSWR('users?page=' + searchParams.get('page'), async (url) => {
    const { data } = await httpGet(url);

    return data;
  });

  console.log('UserList Render');

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>手机号码</th>
            <th>邮箱</th>
            <th>姓名</th>
            <th>头像</th>
            <th>注册 IP</th>
            <th>注册来源</th>
            <th>注册时间</th>
            <th align={'right'}>操作</th>
          </tr>
        </thead>
        <tbody>
          {data &&
            data.items.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.phone}</td>
                <td>{user.email}</td>
                <td>{user.name}</td>
                <td>
                  <img style={{ height: '32px', width: '32px' }} alt={user.name} src={user.avatar} />
                </td>
                <td>{user.createdIp}</td>
                <td>{user.createdFrom.description}</td>
                <td>{user.createdAt}</td>
                <td align={'right'}>
                  <Link to={'edit/' + user.id}>编辑</Link>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
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
        <UserDownload />
      </p>
      <UserList />
    </div>
  );
};

export default UserIndex;
