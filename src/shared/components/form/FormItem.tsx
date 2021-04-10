import { forwardRef } from '@chakra-ui/system';
import { FormControl, FormControlProps, Grid, GridItem, GridProps, ResponsiveValue } from '@chakra-ui/react';
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
  const {
    children,
    id,
    isInvalid = false,
    isRequired = false,
    gap = 2.5,
    label,
    labelWidth = 2,
    labelAlign = 'end',
    fieldWidth = 22,
    ...restProps
  } = props;

  return (
    <Grid
      templateColumns="repeat(24, 1fr)"
      id={id}
      gap={gap}
      as={FormControl}
      isInvalid={isInvalid}
      isRequired={isRequired}
      ref={ref}
      {...restProps}
    >
      <GridItem
        align={labelAlign}
        colSpan={labelWidth}
        as={FormLabel}
        paddingTop={'0.055em'}
        lineHeight={9}
        height={10}
        marginBottom={0}
      >
        {label}
      </GridItem>
      <GridItem colSpan={fieldWidth}>{children}</GridItem>
    </Grid>
  );
});

export { FormItem };
