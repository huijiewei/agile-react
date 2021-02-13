import { useParams } from 'react-router-dom';
import { FC, useEffect } from 'react';

const UserEdit: FC = () => {
  console.log('UserEdit init');

  const { id } = useParams();

  useEffect(() => {
    console.log(id);

    console.log('UserEdit render');
  }, [id]);

  return <div className={'ag-box'}>UserEdit: {id}</div>;
};

export default UserEdit;
