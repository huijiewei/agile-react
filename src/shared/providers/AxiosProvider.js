import { createContext } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';

export const AxiosContext = createContext(Axios);

const AxiosProvider = ({ axios = Axios, children }) => {
  return <AxiosContext.Provider value={axios}>{children}</AxiosContext.Provider>;
};

AxiosProvider.propTypes = {
  axios: PropTypes.any,
  children: PropTypes.node,
};

export default AxiosProvider;
