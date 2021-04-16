import { IconButton, Select, SelectProps, Skeleton, Stack, forwardRef } from '@chakra-ui/react';
import { useCallback, useEffect, useState } from 'react';
import { Refresh } from '@icon-park/react';
import { Dict } from '@shared/utils/types';
import { DynamicSelect } from '@shared/components/select/DynamicSelect';

type RemoteSelectOptionType = Dict[];

type RemoteSelectProps = SelectProps & {
  optionLabel: string;
  optionValue: string;
  buttonTitle?: string;
  remoteMethod: (callback: (optionData: RemoteSelectOptionType) => void) => void;
};

const RemoteSelect = forwardRef<RemoteSelectProps, 'select'>((props, ref) => {
  const {
    name,
    remoteMethod,
    optionLabel,
    optionValue,
    buttonTitle = '刷新选项数据',
    isDisabled,
    defaultValue,
    ...restProps
  } = props;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<RemoteSelectOptionType>();

  const loadOptions = useCallback(() => {
    setLoading(true);

    remoteMethod((optionData) => {
      setOptions(optionData);

      setLoading(false);
    });
  }, [remoteMethod]);

  useEffect(() => {
    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack alignItems={'center'} direction={'row'} spacing={3}>
      <DynamicSelect
        defaultValue={defaultValue}
        name={name}
        isDisabled={isDisabled || loading}
        ref={ref}
        {...restProps}
        options={options}
        skeletonProps={{ height: 10 }}
        optionRender={(option, index) => (
          <option key={name + '-' + index} value={option[optionValue]}>
            {option[optionLabel]}
          </option>
        )}
      />
      <IconButton
        onClick={loadOptions}
        size={'sm'}
        variant={'outline'}
        colorScheme={'gray'}
        title={buttonTitle}
        aria-label={buttonTitle}
        icon={<Refresh />}
        isLoading={loading}
        isDisabled={isDisabled}
      />
    </Stack>
  );
});

export { RemoteSelect };
