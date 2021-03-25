import { useParams } from 'react-router-dom';
import ContentLayout from '@admin/layouts/ContentLayout';
import { useUserView } from '@admin/services/useUser';

const UserEdit = () => {
  const { id } = useParams();

  const { data } = useUserView(id);

  console.log('UserEdit Render');

  return <ContentLayout>{data && <div className={'ag-box'}>UserEdit: {data.name}</div>}</ContentLayout>;
};

export default UserEdit;
