import { ReactElement } from 'react';
import { Spinner } from '@shared/components/spinner/Spinner';
import { __DEV__ } from '@shared/utils/assertion';
import { forwardRefWithAs } from '@shared/utils/react';
import styled from '@emotion/styled';

type ButtonProps = {
  isActive?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  isFullWidth?: boolean;
  type?: 'button' | 'reset' | 'submit';
  spinner?: ReactElement;
  color?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'success' | 'warning' | 'danger';
  size?: 'sm' | 'base' | 'lg' | 'xl';
};

const StyledButton = styled.button<ButtonProps>(
  {
    position: 'relative',
    display: 'inline-block',
    textAlign: 'center',
    cursor: 'pointer',
    userSelect: 'none',
    touchAction: 'manipulation',
    outline: 'none',
  },
  (props) => ({
    width: props.isFullWidth ? '100%' : 'auto',
    color: `var(--color-button-${props.color})`,
    backgroundColor: `var(--color-button-${props.color}-background)`,
  })
);

const Button = forwardRefWithAs<ButtonProps, 'button'>((props, ref) => {
  const {
    as,
    isLoading = false,
    isDisabled = false,
    loadingText,
    color = 'primary',
    size = 'base',
    type = 'button',
    children,
    ...restProps
  } = props;

  return (
    <StyledButton as={as} type={as ? undefined : type} disabled={isDisabled || isLoading} ref={ref} {...restProps}>
      {!isLoading ? children : <Spinner label={loadingText} color={color} size={size} />}
    </StyledButton>
  );
});

if (__DEV__) {
  Button.displayName = 'Button';
}

export { Button };
