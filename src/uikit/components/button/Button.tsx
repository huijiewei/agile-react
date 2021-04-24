import { ForwardRefComponent } from '@uikit/utils/polymorphic';
import { forwardRef, ReactElement, useCallback, useState } from 'react';
import { __DEV__ } from '@uikit/utils/assertion';
import { buttonClassName, buttonSizeClassName, buttonVariantClassName } from './Button.css';
import { Primitive } from '@uikit/components/primitive/Primitive';
import { mergedRefs } from '@uikit/utils/react';
import { clsx, dataAttr } from '@uikit/utils/dom';
import { useButtonGroup } from '@uikit/components/button/ButtonGroup';

const NAME = 'Button';
const DEFAULT_TAG = 'button';

type ButtonProps = {
  isLoading?: boolean;
  loadingText?: string;

  isActive?: boolean;
  isDisabled?: boolean;
  isFullWidth?: boolean;
  type?: 'button' | 'reset' | 'submit';
  variant?: 'solid' | 'outline' | 'ghost' | 'link';
  size?: 'xs' | 'sm' | 'md' | 'lg';

  spinner?: ReactElement;
  spinnerPlacement?: 'start' | 'end';
};

type ButtonPrimitive = ForwardRefComponent<typeof DEFAULT_TAG, ButtonProps>;

const Button: ButtonPrimitive = forwardRef((props, ref) => {
  const group = useButtonGroup();

  const {
    as = DEFAULT_TAG,
    isLoading = false,
    loadingText,
    isActive = false,
    isDisabled = group?.isDisabled,
    isFullWidth = false,
    type,
    variant = 'solid',
    size = 'md',
    spinner,
    spinnerPlacement = 'start',
    children,
    ...restProps
  } = props;

  const [isButton, setIsButton] = useState(!as);

  const refCallback = useCallback((node: HTMLElement | null) => {
    if (!node) {
      return;
    }

    setIsButton(node.tagName === 'BUTTON');
  }, []);

  const defaultType = isButton ? 'button' : undefined;

  return (
    <Primitive
      ref={mergedRefs(ref, refCallback)}
      as={as}
      type={type ?? defaultType}
      className={clsx('ag-button', buttonClassName, buttonSizeClassName[size], buttonVariantClassName[variant])}
      data-active={dataAttr(isActive)}
      data-loading={dataAttr(isLoading)}
      disabled={isDisabled || isLoading}
      {...restProps}
    >
      {children}
    </Primitive>
  );
});

if (__DEV__) {
  Button.displayName = NAME;
}

export { Button };
