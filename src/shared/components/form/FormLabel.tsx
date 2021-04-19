import { __DEV__, cx } from '@chakra-ui/utils';
import {
  chakra,
  FormLabelProps,
  RequiredIndicator,
  SystemProps,
  useFormControlContext,
  useStyleConfig,
  forwardRef,
  omitThemingProps,
} from '@chakra-ui/react';

const FormLabel = forwardRef<
  FormLabelProps & { align: 'start' | 'end'; requiredIndicatorSpacing: SystemProps['marginStart'] },
  'label'
>((props, ref) => {
  const styles = useStyleConfig('FormLabel', props);
  const ownProps = omitThemingProps(props);

  const { className, align, children, requiredIndicator, requiredIndicatorSpacing = 2, ...restProps } = ownProps;

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
      {...field?.getLabelProps(restProps, ref)}
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
