import { createContext, forwardRef, useContext, useMemo } from 'react';
import { ForwardRefComponent } from '@uikit/utils/polymorphic';
import { __DEV__ } from '@uikit/utils/assertion';
import { Primitive } from '@uikit/components/primitive/Primitive';
import { buttonGroupClassName } from '@uikit/components/button/ButtonGroup.css';

type ButtonGroupContextType = {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  isDisabled?: boolean;
};

const ButtonGroupContext = createContext<ButtonGroupContextType | undefined>(undefined);

const useButtonGroup = (): ButtonGroupContextType | undefined => {
  return useContext(ButtonGroupContext);
};

type ButtonGroupProps = ButtonGroupContextType & {
  isAttached?: boolean;
  spacing?: string;
};

const DEFAULT_TAG = 'div';

type ButtonGroupPrimitive = ForwardRefComponent<typeof DEFAULT_TAG, ButtonGroupProps>;

const ButtonGroup: ButtonGroupPrimitive = forwardRef((props, ref) => {
  const { as = DEFAULT_TAG, size, variant, isDisabled, isAttached, children, ...restProps } = props;

  const context = useMemo(() => {
    return { size, variant, isDisabled };
  }, [size, variant, isDisabled]);

  return (
    <ButtonGroupContext.Provider value={context}>
      <Primitive className={buttonGroupClassName} as={as} ref={ref} {...restProps}>
        {children}
      </Primitive>
    </ButtonGroupContext.Provider>
  );
});

if (__DEV__) {
  ButtonGroup.displayName = 'ButtonGroup';
}

export { ButtonGroup, useButtonGroup };
