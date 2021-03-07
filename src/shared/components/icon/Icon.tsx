import { forwardRef, ReactNode, SVGAttributes } from 'react';
import { __DEV__ } from '@shared/utils/assertion';
import clsx from 'clsx';

const fallbackIcon = {
  path: (
    <g stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="round" fill="none" d="M9,9a3,3,0,1,1,4,2.829,1.5,1.5,0,0,0-1,1.415V14.25" />
      <path fill="currentColor" strokeLinecap="round" d="M12,17.25a.375.375,0,1,0,.375.375A.375.375,0,0,0,12,17.25h0" />
      <circle fill="none" strokeMiterlimit="10" cx="12" cy="12" r="11.25" />
    </g>
  ),
  viewBox: '0 0 24 24',
};

export interface IconProps extends SVGAttributes<SVGElement> {
  size?: number;
}

const Icon = forwardRef<SVGElement, IconProps>((props, ref) => {
  const { viewBox, size = 4, color = 'current', focusable = false, children, className, ...rest } = props;

  const _className = clsx(`w-${size} h-${size} inline-block leading-none flex-shrink-0 text-${color}`, className);

  const shared: unknown = {
    ref,
    focusable,
    className: _className,
  };

  const _viewBox = viewBox ?? fallbackIcon.viewBox;

  const _path = (children ?? fallbackIcon.path) as ReactNode;

  return (
    <svg viewBox={_viewBox} {...shared} {...rest}>
      {_path}
    </svg>
  );
});

if (__DEV__) {
  Icon.displayName = 'Icon';
}

export default Icon;
