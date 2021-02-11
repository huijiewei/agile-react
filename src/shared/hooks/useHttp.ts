import { useContext } from 'react';
import { HttpContext } from '@shared/providers/HttpProvider';
import { AxiosInstance } from 'axios';

const useHttp = (): AxiosInstance | null => {
  return useContext(HttpContext);
};

export default useHttp;
