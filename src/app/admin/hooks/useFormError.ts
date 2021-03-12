import { ErrorOption, FieldName, FieldValues } from 'react-hook-form';
import { AxiosError } from 'axios';

const useFormError = (): {
  bindErrors: (
    error: AxiosError,
    setError: (field: FieldName<FieldValues>, message: ErrorOption) => void,
    clearErrors: () => void
  ) => Record<string, string> | undefined;
} => {
  const bindErrors = (error, setError, clearErrors) => {
    const result = {};

    clearErrors();

    if (!error || !error.response || !error.response.status || error.response.status !== 422) {
      return;
    }

    const violations = Array.isArray(error.response.data.violations)
      ? error.response.data.violations
      : Array.isArray(error.response.data)
      ? error.response.data
      : [];

    if (violations.length === 0) {
      return;
    }

    violations.map((violation) => {
      const field = violation.field.split('.').pop();

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
