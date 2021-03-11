import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';

export const useLocalStorage = <T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const localStorageValue = window.localStorage.getItem(key);

      if (localStorageValue !== null) {
        return JSON.parse(localStorageValue);
      } else {
        initialValue && localStorage.setItem(key, JSON.stringify(initialValue));

        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  const setValue: Dispatch<SetStateAction<T>> = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;

      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };

  const handleStorage = useCallback(
    (event: StorageEvent) => {
      if (event.storageArea === localStorage && event.key === key) {
        const newValue = event.newValue ? JSON.parse(event.newValue) : null;

        console.log(newValue, storedValue);

        if (newValue !== storedValue) {
          setStoredValue(newValue);
        }
      }
    },
    [key, storedValue]
  );

  useEffect(() => {
    window.addEventListener('storage', handleStorage);

    return () => window.removeEventListener('storage', handleStorage);
  }, [handleStorage]);

  return [storedValue, setValue];
};
