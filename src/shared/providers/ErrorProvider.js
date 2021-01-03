import { createContext, useState, useCallback } from 'react';
import PropTypes from 'prop-types';

export const ErrorContext = createContext({
  error: null,
  addError: () => {},
  removeError: () => {},
});

const ErrorProvider = ({ children }) => {
  const [error, setError] = useState(null);

  const removeError = () => setError(null);

  const addError = (message, historyBack) => setError({ message, historyBack });

  const contextValue = {
    error,
    addError: useCallback((message, historyBack) => addError(message, historyBack), []),
    removeError: useCallback(() => removeError(), []),
  };

  return <ErrorContext.Provider value={contextValue}>{children}</ErrorContext.Provider>;
};

ErrorProvider.propTypes = {
  children: PropTypes.node,
};

export default ErrorProvider;
