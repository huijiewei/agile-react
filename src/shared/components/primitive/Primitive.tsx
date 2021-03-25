import { __DEV__ } from '@shared/utils/assertion';
import { forwardRefWithAs } from '@shared/utils/react';

const DEFAULT_TAG = 'div';

type PrimitiveProps = Record<string, never>;

const Primitive = forwardRefWithAs<PrimitiveProps>((props, ref) => {
  const { as: Comp = DEFAULT_TAG, ...restProps } = props;

  return <Comp ref={ref} {...restProps} />;
});

if (__DEV__) {
  Primitive.displayName = 'Primitive';
}

export { Primitive };
