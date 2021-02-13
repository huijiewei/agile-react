import { useParams } from 'react-router-dom';
import { FC } from 'react';
import useHttp from '@shared/hooks/useHttp';

const UserEdit: FC = () => {
  const { id } = useParams();

  const { data, error } = useHttp('GET', 'auth/account', { id: id });

  console.log(data, error);

  return <div className={'ag-box'}>UserEdit: {id}</div>;
};

export default UserEdit;
