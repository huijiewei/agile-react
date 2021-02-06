import { createContext, ReactNode } from 'react';
import Axios from 'axios';

export const HttpContext = createContext(Axios);

interface HttpProviderProps {
  getApiHost: () => void;
  getAccessToken: () => void;
  children: ReactNode;
}

export const HttpProvider = ({ client = Axios, children }) => {
  return <HttpContext.Provider value={axios}>{children}</HttpContext.Provider>;
};
