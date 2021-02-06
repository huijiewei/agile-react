import { useContext } from 'react';
import { ErrorContext, IErrorContext } from '@shared/providers/ErrorProvider';

export const useError = (): IErrorContext => useContext(ErrorContext);
