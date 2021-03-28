import { __DEV__ } from '@shared/utils/assertion';
import { forwardRefWithAs } from '@shared/utils/react';

type PrimitiveProps = Record<string, never>;

const Primitive = forwardRefWithAs<PrimitiveProps, 'div'>((props, ref) => {
  const { as: Comp = 'div', ...restProps } = props;

  return <Comp ref={ref} {...restProps} />;
});

if (__DEV__) {
  Primitive.displayName = 'Primitive';
}

export { Primitive };
