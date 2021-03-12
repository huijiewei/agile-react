import { useParams } from 'react-router-dom';
import useRequest from '@shared/hooks/useRequest';
import useSWR from 'swr';

const UserEdit = () => {
  const { id } = useParams();
  const { httpGet } = useRequest();

  const { data } = useSWR('users/' + id, async (url: string) => {
    return await httpGet(url);
  });

  console.log('UserEdit Render');

  return <>{data && <div className={'ag-box'}>UserEdit: {data.name}</div>}</>;
};

export default UserEdit;
