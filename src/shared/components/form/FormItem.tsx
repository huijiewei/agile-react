import { forwardRef } from '@chakra-ui/system';
import { FormControl, FormControlProps, FormLabel, Grid, GridItem, GridProps, ResponsiveValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

type FormItemOptions = {
  label: ReactNode;
  labelWidth?: ResponsiveValue<number | 'auto'> | undefined;
  labelTextAlign?: 'left' | 'right';
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
    labelTextAlign = 'right',
    fieldWidth = 20,
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
        textAlign={labelTextAlign}
        colSpan={labelWidth}
        as={FormLabel}
        lineHeight={10}
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
