import { VisuallyHidden } from '@shared/components/visually-hidden/VisuallyHidden';
import { __DEV__ } from '@shared/utils/assertion';
import { forwardRefWithAs } from '@shared/utils/react';

type SpinnerProps = {
  size?: 'sm' | 'base' | 'lg' | 'xl';
  color?: 'primary' | 'secondary' | 'tertiary' | 'link' | 'success' | 'warning' | 'danger';
  label?: string;
};

const Spinner = forwardRefWithAs<SpinnerProps, 'span'>((props, ref) => {
  const { as: Comp = 'span', label = 'Loading...', ...restProps } = props;

  return (
    <Comp ref={ref} {...restProps}>
      {label && <VisuallyHidden>{label}</VisuallyHidden>}
    </Comp>
  );
});

if (__DEV__) {
  Spinner.displayName = 'Spinner';
}

export { Spinner };
