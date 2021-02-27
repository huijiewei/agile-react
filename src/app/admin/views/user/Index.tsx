import { VFC } from 'react';
import { useGet } from '@shared/contexts/HttpContext';
import { Link } from 'react-router-dom';

const UserList: VFC = () => {
  const { data } = useGet('users');

  console.log(data);

  console.log('UserList Render');

  return <>{data && data.items.map((user) => <UserListItem key={user.id} user={user} />)}</>;
};

const UserListItem: VFC = ({ user }) => {
  return (
    <li>
      <Link to={'edit/' + user.id}>{user.name}</Link>
    </li>
  );
};

const UserIndex: VFC = () => {
  console.log('UserIndex Render');

  return (
    <div className={'ag-box'}>
      <h5>UserIndex</h5>
      <ul>
        <UserList />
      </ul>
    </div>
  );
};

export default UserIndex;
