import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useErrorDispatch } from '@shared/contexts/ErrorContext';
import {
  Avatar,
  Box,
  Button,
  Pagination,
  PaginationItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

import ContentLayout from '@admin/layouts/ContentLayout';
import { useUserAll } from '@admin/services/useUser';
import LoadingButton from '@material-ui/lab/LoadingButton';
import { useHttp } from '@shared/contexts/HttpContext';

const UserList = () => {
  const { data } = useUserAll();

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>手机号码</TableCell>
              <TableCell>邮箱</TableCell>
              <TableCell>姓名</TableCell>
              <TableCell align="center">头像</TableCell>
              <TableCell>注册 IP</TableCell>
              <TableCell>注册来源</TableCell>
              <TableCell>注册时间</TableCell>
              <TableCell align={'right'}>操作</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.items.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.id}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="center">
                    <Avatar sx={{ height: '32px', width: '32px' }} alt={user.name} src={user.avatar} />
                  </TableCell>
                  <TableCell>{user.createdIp}</TableCell>
                  <TableCell>{user.createdFrom.description}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell align={'right'}>
                    <Button size="tiny" variant="outlined" component={Link} to={'edit/' + user.id}>
                      编辑
                    </Button>
                    &nbsp;
                    <Button size="tiny" color="secondary" variant="outlined">
                      删除
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box sx={{ textAlign: 'right', marginTop: '16px' }}>
        {data && (
          <Pagination
            shape="rounded"
            count={data.pages.pageCount}
            page={data.pages.currentPage}
            renderItem={(item) => (
              <PaginationItem component={Link} to={`${item.page === 1 ? '' : `?page=${item.page}`}`} {...item} />
            )}
          />
        )}
      </Box>
    </>
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
    <LoadingButton pending={loading} onClick={handleDownload}>
      用户导出
    </LoadingButton>
  );
};

const UserIndex = () => {
  console.log('UserIndex Render');

  return (
    <ContentLayout>
      <h5>UserIndex</h5>
      <p>
        <Button component={Link} to={'create'}>
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
