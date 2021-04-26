import {
  FormControl,
  FormControlProps,
  forwardRef,
  GridItem,
  GridProps,
  ResponsiveValue,
  SimpleGrid,
  useStyleConfig,
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

  const styles = useStyleConfig('FormHorizontalLabel', props);

  return (
    <SimpleGrid columns={24} gap={gap} as={FormControl} ref={ref} {...restProps}>
      <GridItem sx={styles} textAlign={labelAlign} colSpan={labelWidth} as={FormLabel} marginBottom={0}>
        {label}
      </GridItem>
      <GridItem colSpan={fieldWidth}>{children}</GridItem>
    </SimpleGrid>
  );
});

export { FormItem };
