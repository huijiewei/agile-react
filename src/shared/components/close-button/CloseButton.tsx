import Icon, { IconProps } from '@shared/components/icon/Icon';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';
import clsx from 'clsx';
import { __DEV__ } from '@shared/utils/assertion';

const CloseIcon: FC<IconProps> = (props) => (
  <Icon focusable="false" aria-hidden {...props}>
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </Icon>
);

export interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
}

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const { children, isDisabled, className, ...rest } = props;

  const DEFAULTS = `flex outline-none items-center transition-colors duration-200 justify-center text-gray-500 flex-shrink-0 rounded leading-none focus:outline-none focus:ring focus:ring-gray-200 hover:bg-gray-100 w-8 h-8`;

  const _classNames = clsx(className, DEFAULTS, isDisabled ? 'opacity-50 cursor-not-allowed' : '');

  return (
    <button type="button" aria-label="Close" ref={ref} disabled={isDisabled} className={_classNames} {...rest}>
      {children || <CloseIcon />}
    </button>
  );
});

if (__DEV__) {
  CloseButton.displayName = 'CloseButton';
}

export default CloseButton;
