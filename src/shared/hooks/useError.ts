import { useContext } from 'react';
import { ErrorContext, IErrorContext } from '@shared/contexts/ErrorContext';

export const useError = (): IErrorContext => useContext(ErrorContext);
