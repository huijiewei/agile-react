import {
  FormControl,
  FormControlProps,
  forwardRef,
  GridItem,
  GridProps,
  ResponsiveValue,
  SimpleGrid,
} from '@chakra-ui/react';
import { ReactNode } from 'react';
import { FormLabel } from './FormLabel';

type FormItemOptions = {
  label: ReactNode;
  labelWidth?: ResponsiveValue<number | 'auto'> | undefined;
  labelAlign?: 'start' | 'end';
  fieldWidth?: ResponsiveValue<number | 'auto'> | undefined;
};

type FormItemProps = GridProps & FormControlProps & FormItemOptions;

const FormItem = forwardRef<FormItemProps, 'div'>((props, ref) => {
  const { children, gap = 2.5, label, labelWidth = 2, labelAlign = 'end', fieldWidth = 22, ...restProps } = props;

  return (
    <SimpleGrid columns={24} gap={gap} as={FormControl} ref={ref} {...restProps}>
      <GridItem
        align={labelAlign}
        colSpan={labelWidth}
        as={FormLabel}
        paddingTop={'0.05em'}
        lineHeight={9}
        height={10}
        marginBottom={0}
      >
        {label}
      </GridItem>
      <GridItem colSpan={fieldWidth}>{children}</GridItem>
    </SimpleGrid>
  );
});

export { FormItem };
