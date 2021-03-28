import styled from '@emotion/styled';
import { VisuallyHidden } from '@shared/components/visually-hidden/VisuallyHidden';
import { __DEV__ } from '@shared/utils/assertion';
import { forwardRefWithAs } from '@shared/utils/react';

type SpinnerProps = {
  size?: 'sm' | 'md' | 'lg';
  emptyColor?: string;
  palette?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'success' | 'warning' | 'danger';
  label?: string;
  speed?: string;
  thickness?: string;
};

const SpinnerStyled = styled.span({
  display: 'inline-block',
  borderColor: 'currentcolor',
  borderRadius: '9999px',
  borderStyle: 'solid',
});

const Spinner = forwardRefWithAs<SpinnerProps, 'span'>((props, ref) => {
  const { as: Comp = 'span', label = 'Loading...', ...restProps } = props;

  return (
    <SpinnerStyled as={Comp} ref={ref} {...restProps}>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </SpinnerStyled>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

export { Spinner };
