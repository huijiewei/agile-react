import { forwardRef } from '@chakra-ui/system';
import { IconButton, Select, SelectProps, Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Refresh } from '@icon-park/react';
import { Dict } from '@shared/utils/types';

type RemoteSelectOptionType = Dict[];

type RemoteSelectProps = SelectProps & {
  optionLabel: string;
  optionValue: string;
  buttonTitle?: string;
  remoteMethod: (callback: (optionData: RemoteSelectOptionType) => void) => void;
};

const RemoteSelect = forwardRef<RemoteSelectProps, 'select'>((props, ref) => {
  const {
    id,
    remoteMethod,
    optionLabel,
    optionValue,
    buttonTitle = '刷新选项数据',
    isDisabled,
    defaultValue,
    ...restProps
  } = props;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<RemoteSelectOptionType>([]);

  const loadOptions = () => {
    setLoading(true);

    remoteMethod((optionData) => {
      setOptions(optionData);

      setLoading(false);
    });
  };

  useEffect(() => {
    loadOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack alignItems={'center'} direction={'row'} spacing={3}>
      <Select isDisabled={isDisabled} ref={ref} {...restProps}>
        {options.map((option, idx) => (
          <option selected={defaultValue == option[optionValue]} key={id + '-' + idx} value={option[optionValue]}>
            {option[optionLabel]}
          </option>
        ))}
      </Select>
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
