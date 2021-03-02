import { VFC } from 'react';
import { Link } from 'react-router-dom';
import { useUserList } from '@admin/services/useUser';
import {
  Avatar,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@material-ui/core';

const UserList: VFC = () => {
  const { data, isValidating } = useUserList();

  console.log(isValidating, data);

  console.log('UserList Render');

  return (
    <>
      {data && (
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
                {data.items.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>{user.phone}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>
                      <Avatar src={user.avatar} />
                    </TableCell>
                    <TableCell>{user.createdIp}</TableCell>
                    <TableCell>{user.createdFrom.description}</TableCell>
                    <TableCell>{user.createdAt}</TableCell>
                    <TableCell align={'right'}>{user.id}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          {data.pages && <Pagination variant="outlined" shape="rounded" count={data.pages.pageCount} />}
        </>
      )}
    </>
  );
};

const UserListItem: VFC = ({ user }) => {
  return (
    <li>
      <Link to={'edit/' + user.id + 1000}>{user.name}</Link>
    </li>
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
