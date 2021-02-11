import { useCallback, useEffect, useState } from 'react';

const useLocalStorage = <T>(key: string, initialValue: T): [T, (val: T) => void, () => void] => {
  const [value, setValue] = useState<T>(() => {
    const item = window.localStorage.getItem(key);

    return item ? JSON.parse(item) : initialValue;
  });

  const set = useCallback((data: T) => window.localStorage.setItem(key, JSON.stringify(data)), [key]);
  const remove = useCallback(() => window.localStorage.removeItem(key), [key]);

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.storageArea === window.localStorage && event.key === key && event.newValue) {
        setValue(JSON.parse(event.newValue));
      }
    },
    [key],
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [value, set, remove];
};

export default useLocalStorage;
