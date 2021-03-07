import { FC } from 'react';
import { __DEV__ } from '@shared/utils/assertion';

const VisuallyHidden: FC = ({ children }) => {
  return <span className={'sr-only'}>{children}</span>;
};

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}

export default VisuallyHidden;
