import { Grid, GridItem, GridProps, ResponsiveValue } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';

type FormActionProps = GridProps & { labelWidth?: ResponsiveValue<number | 'auto'> | undefined };

const FormAction = (props: PropsWithChildren<FormActionProps>): JSX.Element => {
  const { children, gap = 2.5, labelWidth = 3, ...restProps } = props;

  return (
    <Grid className={'chakra-form-action'} templateColumns="repeat(24, 1fr)" gap={gap} {...restProps}>
      <GridItem colStart={labelWidth} colEnd={25}>
        {children}
      </GridItem>
    </Grid>
  );
};

export { FormAction };
