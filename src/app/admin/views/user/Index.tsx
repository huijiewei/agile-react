import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';

import ContentLayout from '@admin/layouts/ContentLayout';
import { useUserAll } from '@admin/services/useUser';
import { useHttp } from '@shared/contexts/HttpContext';
import { Button } from '@chakra-ui/react';

const UserList = () => {
  const { data } = useUserAll();

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>手机号码</th>
            <th>邮箱</th>
            <th>姓名</th>
            <th align="center">头像</th>
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
                <td align="center">
                  <img style={{ height: '32px', width: '32px' }} alt={user.name} src={user.avatar} />
                </td>
                <td>{user.createdIp}</td>
                <td>{user.createdFrom.description}</td>
                <td>{user.createdAt}</td>
                <td align={'right'}>
                  <Link to={'edit/' + user.id}>编辑</Link>
                  <button>删除</button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

const UserDownload = () => {
  const { download } = useHttp();
  const { setError } = useErrorDispatch();
  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    setLoading(true);

    const result = await download('GET', 'users/export');

    setLoading(false);

    if (!result) {
      setError('下载失败', false);
    }
  };

  return (
    <button disabled={loading} onClick={handleDownload}>
      用户导出
    </button>
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
      <UserList />
    </ContentLayout>
  );
};

export default UserIndex;
