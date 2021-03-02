import { useAxios } from '@shared/contexts/AxiosContext';
import useSWR from 'swr';

const useAccount = () => {
  const axios = useAxios();

  return useSWR('auth/account', async () => {
    const { data } = await axios.get('auth/account');

    return data;
  });
};

export default useAccount;
