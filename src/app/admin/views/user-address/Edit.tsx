import { useMessage } from '@shared/hooks/useMessage';
import { useParams } from 'react-router-dom';
import ContentLayout from '@admin/layouts/ContentLayout';
import { UserAddress, useUserAddressView } from '@admin/services/useUserAddress';

const UserAddressEdit = (): JSX.Element => {
  const { success } = useMessage();
  const { id } = useParams();

  const { data, mutate } = useUserAddressView(id);

  const onSuccess = async (userAddress: UserAddress) => {
    success(`用户地址 ${userAddress.alias} 编辑成功`);

    await mutate(userAddress, false);
  };

  return <ContentLayout>{data && <p>{data.alias}</p>}</ContentLayout>;
};

export default UserAddressEdit;
