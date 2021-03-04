import { useParams } from 'react-router-dom';
import { VFC } from 'react';
import useRequest from '@shared/hooks/useRequest';
import useSWR from 'swr';

const UserEdit: VFC = () => {
  const { id } = useParams();
  const { httpGet } = useRequest();

  const { data } = useSWR('users/' + id, async (url) => {
    const { data } = await httpGet(url);

    return data;
  });

  console.log('UserEdit Render');

  return <>{data && <div className={'ag-box'}>UserEdit: {data.name}</div>}</>;
};

export default UserEdit;
