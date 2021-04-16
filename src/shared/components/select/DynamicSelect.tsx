import { Dict } from '@shared/utils/types';
import { forwardRef, Select, SelectProps, Skeleton, SkeletonProps } from '@chakra-ui/react';

type DynamicSelectProps = SelectProps & {
  options: Dict[] | null | undefined;
  optionRender: (option: Dict, index: number) => void;
  skeletonProps?: SkeletonProps;
};

const DynamicSelect = forwardRef<DynamicSelectProps, 'select'>((props: DynamicSelectProps, ref) => {
  const { options, optionRender, defaultValue, skeletonProps = {}, ...restProps } = props;

  if (defaultValue === undefined || !options) {
    const { width = '100%', ...skeletonRestProps } = skeletonProps;

    return <Skeleton width={width} {...skeletonRestProps} />;
  }

  return (
    <Select defaultValue={defaultValue} ref={ref} {...restProps}>
      {options.map((option, index) => optionRender(option, index))}
    </Select>
  );
});

export { DynamicSelect };
