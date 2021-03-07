import { forwardRef, HTMLAttributes, useMemo } from 'react';
import { __DEV__ } from '@shared/utils/assertion';
import clsx from 'clsx';
import { StringOrNumber } from '@shared/utils/types';
import { createContext } from '@shared/utils/react';
import { ButtonTheme } from '@shared/components/button/ButtonTheme';

interface ButtonGroupProps extends HTMLAttributes<HTMLDivElement>, ButtonGroupContext {}

interface ButtonGroupContext extends ButtonTheme {
  isDisabled?: boolean;
  isAttached?: boolean;
  spacing?: StringOrNumber;
}

const [ButtonGroupProvider, useButtonGroup] = createContext<ButtonGroupContext>({
  strict: false,
  name: 'ButtonGroupContext',
});

export { useButtonGroup };

const ButtonGroup = forwardRef<HTMLDivElement, ButtonGroupProps>((props, ref) => {
  const { size, variant, colorScheme, className, spacing = 2, isAttached, isDisabled, children, ...rest } = props;

  const context = useMemo(() => ({ size, variant, colorScheme, spacing, isDisabled, isAttached }), [
    size,
    variant,
    colorScheme,
    spacing,
    isDisabled,
    isAttached,
  ]);

  const DEFAULTS = 'inline-flex';

  const _className = clsx(className, DEFAULTS, isAttached ? 'space-x-px' : `space-x-${spacing}`);

  return (
    <ButtonGroupProvider value={context}>
      <div ref={ref} role="group" className={_className} {...rest}>
        {children}
      </div>
    </ButtonGroupProvider>
  );
});

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}

export default ButtonGroup;
