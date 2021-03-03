import { useHttpGet, useHttpLazyGet } from '@shared/hooks/useHttpGet';
import { IAccount } from '@admin/contexts/AuthUserContext';
import { responseInterface } from 'swr/dist/types';
import { AxiosError } from 'axios';

export const useAccount = (): responseInterface<IAccount, AxiosError> => {
  return useHttpGet<IAccount>('auth/account', null, false);
};

export const useAccountLazy = (): responseInterface<IAccount, AxiosError> => {
  return useHttpLazyGet<IAccount>('auth/account', null, false);
};
