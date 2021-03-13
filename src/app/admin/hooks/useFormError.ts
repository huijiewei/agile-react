import { ErrorOption, FieldName, FieldValues } from 'react-hook-form';
import { AxiosError } from 'axios';
import { Dict } from '@shared/types';

interface Violation {
  field: string;
  message: string;
}

type UseFormErrorType = {
  bindErrors: (
    error: AxiosError,
    setError: (field: FieldName<FieldValues>, message: ErrorOption) => void,
    clearErrors: () => void
  ) => Dict<string> | null;
};

const useFormError = (): UseFormErrorType => {
  const bindErrors = (
    error: AxiosError,
    setError: (field: FieldName<FieldValues>, message: ErrorOption) => void,
    clearErrors: () => void
  ) => {
    const result: Dict<string> = {};

    clearErrors();

    if (!error || !error.response || !error.response.status || error.response.status !== 422) {
      return null;
    }

    const violations: Violation[] = Array.isArray(error.response.data.violations)
      ? error.response.data.violations
      : Array.isArray(error.response.data)
      ? error.response.data
      : [];

    if (violations.length === 0) {
      return null;
    }

    violations.map((violation) => {
      const field = violation.field.split('.').pop() as string;

      setError(field, { type: 'manual', message: violation.message });

      result[field] = violation.message;
    });

    return result;
  };

  return {
    bindErrors,
  };
};

export default useFormError;
