import { useLocation } from 'react-router-dom';
import { createPath, PartialPath, To } from 'history';
import queryString from 'query-string';

const useLoginDirect = (): PartialPath => {
  const location = useLocation();

  const to: To = {
    pathname: 'login',
  };

  if (location.pathname !== 'login') {
    to.search = '?' + queryString.stringify({ direct: createPath(location) });
  }

  return to;
};

export { useLoginDirect };
