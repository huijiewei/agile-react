import { VFC } from 'react';
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
import { Link, useSearchParams } from 'react-router-dom';
import useRequest from '@shared/hooks/useRequest';
import useSWR from 'swr';

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>手机号码</TableCell>
              <TableCell>邮箱</TableCell>
              <TableCell>姓名</TableCell>
              <TableCell>头像</TableCell>
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
                  <TableCell>
                    <Avatar sx={{ height: '32px', width: '32px' }} alt={user.name} src={user.avatar} />
                  </TableCell>
                  <TableCell>{user.createdIp}</TableCell>
                  <TableCell>{user.createdFrom.description}</TableCell>
                  <TableCell>{user.createdAt}</TableCell>
                  <TableCell align={'right'}>
                    <Link to={'edit/' + user.id}>编辑</Link>
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

const UserIndex: VFC = () => {
  console.log('UserIndex Render');

  return (
    <div className={'ag-box'}>
      <h5>UserIndex</h5>
      <UserList />
    </div>
  );
};

export default UserIndex;
