import { forwardRef } from 'react';

import { VisuallyHiddenClassName } from './VisuallyHidden.css';
import { ForwardRefComponent, OwnProps } from '@uikit/utils/polymorphic';
import { Primitive } from '@uikit/components/primitive/Primitive';
import { __DEV__ } from '@uikit/utils/assertion';

const NAME = 'VisuallyHidden';
const DEFAULT_TAG = 'span';

type VisuallyHiddenOwnProps = OwnProps<typeof Primitive>;
type VisuallyHiddenPrimitive = ForwardRefComponent<typeof DEFAULT_TAG, VisuallyHiddenOwnProps>;

const VisuallyHidden: VisuallyHiddenPrimitive = forwardRef((props, ref) => {
  const { as = DEFAULT_TAG, ...restProps } = props;

  return <Primitive className={VisuallyHiddenClassName} as={as} ref={ref} {...restProps} />;
});

if (__DEV__) {
  VisuallyHidden.displayName = NAME;
}

export { VisuallyHidden };
