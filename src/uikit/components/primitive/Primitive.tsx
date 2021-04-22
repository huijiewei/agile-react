import { forwardRef } from 'react';
import { __DEV__ } from '@uikit/utils/assertion';

import { ForwardRefComponent } from '@uikit/utils/polymorphic';

const NAME = 'Primitive';
const DEFAULT_TAG = 'div';

type PrimitiveOwnProps = unknown;

const Primitive: ForwardRefComponent<typeof DEFAULT_TAG, PrimitiveOwnProps> = forwardRef((props, ref) => {
  const { as: Tag = DEFAULT_TAG, ...restProps } = props;
  return <Tag {...restProps} ref={ref} />;
});

if (__DEV__) {
  Primitive.displayName = NAME;
}

export { Primitive };
