import { createContext, useState, useCallback, useRef } from 'react';
import Axios, { AxiosInstance } from 'axios';
import PropTypes from 'prop-types';

export const AxiosContext = createContext(null);

const AxiosProvider = ({ instance, options, children }) => {
  const [error, setError] = useState(null);

  const removeError = () => setError(null);

  const addError = (message, historyBack) => setError({ message, historyBack });

  const contextValue = {
    error,
    addError: useCallback((message, historyBack) => addError(message, historyBack), []),
    removeError: useCallback(() => removeError(), []),
  };

  return <AxiosContext.Provider value={contextValue}>{children}</AxiosContext.Provider>;
};

AxiosProvider.propTypes = {
  instance: AxiosInstance,
  options: PropTypes.node,
  children: PropTypes.node,
};

export default AxiosProvider;
