import { useContext } from 'react';
import { ErrorContext, IErrorContext } from '@shared/contexts/ErrorContext';

const useError = (): IErrorContext => useContext(ErrorContext);

export default useError;
