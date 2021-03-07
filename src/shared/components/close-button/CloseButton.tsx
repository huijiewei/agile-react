import Icon, { IconProps } from '@shared/components/icon/Icon';
import { ButtonHTMLAttributes, FC, forwardRef } from 'react';
import clsx from 'clsx';
import { __DEV__ } from '@shared/utils/assertion';

const CloseIcon: FC<IconProps> = (props) => (
  <Icon focusable="false" aria-hidden {...props}>
    <path
      fill="currentColor"
      d="M.439,21.44a1.5,1.5,0,0,0,2.122,2.121L11.823,14.3a.25.25,0,0,1,.354,0l9.262,9.263a1.5,1.5,0,1,0,2.122-2.121L14.3,12.177a.25.25,0,0,1,0-.354l9.263-9.262A1.5,1.5,0,0,0,21.439.44L12.177,9.7a.25.25,0,0,1-.354,0L2.561.44A1.5,1.5,0,0,0,.439,2.561L9.7,11.823a.25.25,0,0,1,0,.354Z"
    />
  </Icon>
);

export interface CloseButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isDisabled?: boolean;
}

const CloseButton = forwardRef<HTMLButtonElement, CloseButtonProps>((props, ref) => {
  const { children, isDisabled, className, ...rest } = props;

  const DEFAULTS = `flex outline-none items-center justify-center flex-shrink-0`;

  const _classNames = clsx(DEFAULTS, className);

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
