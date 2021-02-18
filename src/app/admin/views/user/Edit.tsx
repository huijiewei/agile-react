import { useParams } from 'react-router-dom';
import { VFC } from 'react';
import { useGet } from '@shared/contexts/HttpContext';

const UserEdit: VFC = () => {
  const { id } = useParams();

  const { data } = useGet('auth/account', { id: id });

  console.log(data);

  return <div className={'ag-box'}>UserEdit: {id}</div>;
};

export default UserEdit;
