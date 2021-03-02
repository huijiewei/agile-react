import React from 'react';

const usePrevious = <T>(value: T, initialValue: T): T => {
  const ref = React.useRef(initialValue);

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePrevious;
