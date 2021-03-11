import { forwardRef, ReactNode, SVGAttributes } from 'react';
import { __DEV__ } from '@shared/utils/assertion';
import clsx from 'clsx';

const fallbackIcon = {
  path: (
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  ),
  viewBox: '0 0 24 24',
};

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: number;
}

const Icon = forwardRef<SVGElement, IconProps>((props, ref) => {
  const { viewBox, size = 5, color = 'current', focusable = false, children, className, ...rest } = props;

  const _className = clsx(
    className,
    `inline-block flex-shrink-0 align-middle text-${color}`,
    size ? `w-${size} h-${size} ` : ''
  );

  const shared = {
    ref,
    focusable,
    className: _className,
  };

  const _viewBox = viewBox ?? fallbackIcon.viewBox;

  const _path = (children ?? fallbackIcon.path) as ReactNode;

  return (
    <svg stroke="currentColor" fill="none" viewBox={_viewBox} {...shared} {...rest}>
      {_path}
    </svg>
  );
});

if (__DEV__) {
  Icon.displayName = 'Icon';
}

export default Icon;
