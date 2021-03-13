import { useParams } from 'react-router-dom';
import useRequest from '@shared/hooks/useRequest';
import useSWR from 'swr';
import ContentLayout from '@admin/layouts/ContentLayout';

const UserEdit = () => {
  const { id } = useParams();
  const { httpGet } = useRequest();

  const { data } = useSWR('users/' + id, (url: string) => httpGet(url));

  console.log('UserEdit Render');

  return <ContentLayout>{data && <div className={'ag-box'}>UserEdit: {data.name}</div>}</ContentLayout>;
};

export default UserEdit;
