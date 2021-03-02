import { useAxios } from '@shared/contexts/AxiosContext';
import useSWR from 'swr';

const useUserList = () => {
  const axios = useAxios();

  return useSWR('users', async () => {
    const { data } = await axios.get('users');

    return data;
  });
};

const useUserView = (id: string) => {
  const axios = useAxios();

  return useSWR(`users/${id}`, async () => {
    const { data } = await axios.get(`users/${id}`, {
      __historyBack: true,
    });

    return data;
  });
};

export { useUserList, useUserView };
