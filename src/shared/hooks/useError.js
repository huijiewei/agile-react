import { useContext } from 'react';
import { ErrorContext } from '../providers/ErrorProvider';

const useError = () => {
  const { error, addError, removeError } = useContext(ErrorContext);
  return { error, addError, removeError };
};

export default useError;
