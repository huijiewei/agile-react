import { useHref, useLocation } from 'react-router-dom';
import { To } from 'history';
import queryString from 'query-string';

const useLoginDirect = (): To => {
  const location = useLocation();

  const to: To = {
    pathname: 'login',
  };

  const href = useHref(location);

  console.log(href);

  if (location.pathname !== 'login') {
    to.search = queryString.stringify({ direct: href });
  }

  return to;
};

export { useLoginDirect };
