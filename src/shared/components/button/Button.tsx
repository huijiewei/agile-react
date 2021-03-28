import { ReactElement } from 'react';
import { Spinner } from '@shared/components/spinner/Spinner';
import { __DEV__ } from '@shared/utils/assertion';
import { forwardRefWithAs } from '@shared/utils/react';
import { styled } from '@shared/theme/stitches.config';

const DEFAULT_TAG = 'button';

type ButtonProps = {
  isActive?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  isFullWidth?: boolean;
  type?: 'button' | 'reset' | 'submit';
  spinner?: ReactElement;
  palette?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
};

const StyledButton = styled(DEFAULT_TAG, {
  display: 'inline-block',
  position: 'relative',
  lineHeight: '$normal',
  cursor: 'pointer',
  textAlign: 'center',
  whiteSpace: 'nowrap',
  borderRadius: '$base',
  fontWeight: '$normal',
  userSelect: 'none',
  touchAction: 'manipulation',
  fontFamily: 'inherit',
  '&, &:active, &:focus': {
    outline: 0,
  },
  variants: {
    isFullWidth: {
      true: {
        width: '100%',
      },
    },
    size: {
      sm: {
        height: '26px',
        padding: '1px 9px',
      },
      md: {
        height: '34px',
        padding: '5px 16px',
      },
      lg: {
        height: '42px',
        padding: '9px 16px',
      },
    },
    palette: {
      primary: {
        border: '1px solid $blue5',
        backgroundColor: '$blue5',
        color: '$white',
        '&:hover': {
          backgroundColor: '$blue6',
          borderColor: '$blue6',
        },
        '&:active': {
          backgroundColor: '$blue7',
          borderColor: '$blue7',
        },
      },
      secondary: {},
      tertiary: {},
      success: {},
      warning: {},
      danger: {},
    },
    variant: {
      solid: {},
      outline: {},
      ghost: {},
      link: {},
    },
  },
});

const Button = forwardRefWithAs<ButtonProps, typeof DEFAULT_TAG>((props, ref) => {
  const {
    as: Comp = DEFAULT_TAG,
    isLoading = false,
    isDisabled = false,
    loadingText,
    palette = 'primary',
    size = 'md',
    type = 'button',
    variant = 'solid',
    children,
    ...restProps
  } = props;

  return (
    <StyledButton
      as={Comp}
      type={Comp == DEFAULT_TAG ? type : undefined}
      disabled={isDisabled || isLoading}
      palette={palette}
      variant={variant}
      size={size}
      ref={ref}
      {...restProps}
    >
      {!isLoading ? children : <Spinner label={loadingText} palette={palette} size={size} />}
    </StyledButton>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}

export { Button };
