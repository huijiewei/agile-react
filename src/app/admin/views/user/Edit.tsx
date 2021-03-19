import { useParams } from 'react-router-dom';
import ContentLayout from '@admin/layouts/ContentLayout';
import { useUseView } from '@admin/services/useUser';

const UserEdit = () => {
  const { id } = useParams();

  const { data } = useUseView(id);

  console.log('UserEdit Render');

  return <ContentLayout>{data && <div className={'ag-box'}>UserEdit: {data.name}</div>}</ContentLayout>;
};

export default UserEdit;
