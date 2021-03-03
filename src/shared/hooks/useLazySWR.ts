import { useState } from 'react';
import useSWR, { ConfigInterface, keyInterface } from 'swr';
import { fetcherFn } from 'swr/dist/types';

const useLazySWR = <T, U>(key: keyInterface, fn?: fetcherFn<T>, config?: ConfigInterface<T, U>) => {
  const [shouldFetch, setShouldFetch] = useState(false);

  const ret = useSWR<T, U>(shouldFetch ? key : null, fn, config);

  const execute = () => {
    setShouldFetch(true);
  };

  return {
    ...ret,
    execute,
  };
};

export default useLazySWR;
