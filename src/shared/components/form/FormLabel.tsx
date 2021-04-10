import { __DEV__, cx } from '@chakra-ui/utils';
import { forwardRef, omitThemingProps } from '@chakra-ui/system';
import {
  chakra,
  FormLabelProps,
  RequiredIndicator,
  SystemProps,
  useFormControlContext,
  useStyleConfig,
} from '@chakra-ui/react';

const FormLabel = forwardRef<
  FormLabelProps & { align: 'start' | 'end'; requiredIndicatorSpacing: SystemProps['marginStart'] },
  'label'
>((passedProps, ref) => {
  const styles = useStyleConfig('FormLabel', passedProps);
  const props = omitThemingProps(passedProps);

  const { className, align, children, requiredIndicator, requiredIndicatorSpacing = 2, ...rest } = props;

  const labelRequiredIndicator =
    requiredIndicator ||
    (align == 'start' ? (
      <RequiredIndicator marginStart={requiredIndicatorSpacing} marginEnd={0} />
    ) : (
      <RequiredIndicator marginStart={0} marginEnd={requiredIndicatorSpacing} />
    ));

  const field = useFormControlContext();

  return (
    <chakra.label
      {...field?.getLabelProps(rest, ref)}
      className={cx('chakra-form__label', className)}
      __css={{
        display: 'block',
        textAlign: align,
        ...styles,
      }}
    >
      {align == 'start' ? (
        <>
          {children}
          {field?.isRequired ? labelRequiredIndicator : null}
        </>
      ) : (
        <>
          {field?.isRequired ? labelRequiredIndicator : null}
          {children}
        </>
      )}
    </chakra.label>
  );
});

if (__DEV__) {
  FormLabel.displayName = 'FormLabel';
}

export { FormLabel };
