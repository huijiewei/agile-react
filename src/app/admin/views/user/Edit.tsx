import { useParams } from 'react-router-dom';
import { VFC } from 'react';
import { useGet } from '@shared/contexts/HttpContext';

const UserEdit: VFC = () => {
  const { id } = useParams();

  const { data } = useGet('users/' + id);

  console.log('UserEdit Render');

  return data && <div className={'ag-box'}>UserEdit: {data.name}</div>;
};

export default UserEdit;
