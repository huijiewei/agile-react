import { __DEV__ } from '@shared/utils/assertion';
import { ReactNode } from 'react';
import './VisuallyHidden.less';

const VisuallyHidden = ({ children }: { children: ReactNode }) => {
  return <span className={'sr-only'}>{children}</span>;
};

if (__DEV__) {
  VisuallyHidden.displayName = 'VisuallyHidden';
}

export { VisuallyHidden };
