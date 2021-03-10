import React from 'react';

export const usePrevious = <T>(value: T, initialValue: T): T => {
  const ref = React.useRef(initialValue);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};
