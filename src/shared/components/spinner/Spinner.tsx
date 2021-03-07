import { forwardRef, HTMLAttributes, VFC } from 'react';
import { __DEV__ } from '@shared/utils/assertion';
import clsx from 'clsx';
import VisuallyHidden from '../visually-hidden/VisuallyHidden';

interface SpinnerOptions {
  color?: string;
  emptyColor?: string;
  thickness?: number;
  label?: string;
  size?: number;
}

export interface SpinnerProps extends SpinnerOptions, HTMLAttributes<HTMLSpanElement> {}

const Spinner: VFC = forwardRef<HTMLSpanElement, SpinnerProps>((props, ref) => {
  const {
    className,
    color = 'current',
    emptyColor = 'transparent',
    thickness = '2',
    size = 4,
    label = 'Loading...',
    ...rest
  } = props;

  const DEFAULTS = `animate-spin rounded-full inline-block overflow-hidden align-middle border-solid border-${emptyColor} border-${thickness} border-l-${color} border-b-${color} text-${color} w-${size} h-${size}`;

  const _classNames = clsx(className, DEFAULTS);

  return (
    <span className={_classNames} ref={ref} {...rest}>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </span>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

export default Spinner;
