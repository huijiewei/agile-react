import { forwardRef, IconButton, Select, SelectProps, Skeleton, Stack } from '@chakra-ui/react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Refresh } from '@icon-park/react';

type Option = {
  value: string | number | readonly string[] | undefined;
  label: ReactNode;
};

export type RemoteSelectProps = SelectProps & {
  buttonText?: string;
  loadOptions: () => Promise<Option[] | undefined>;
};

const RemoteSelect = forwardRef<RemoteSelectProps, 'select'>((props, ref) => {
  const { name, defaultValue, loadOptions, buttonText = '刷新选项数据', isDisabled, ...restProps } = props;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[] | undefined>();

  const fetch = useCallback(async () => {
    setLoading(true);

    const options = await loadOptions();

    setOptions(options);
    setLoading(false);
  }, [loadOptions]);

  useEffect(() => {
    (async () => {
      await fetch();
    })();
  }, [fetch]);

  return (
    <Stack alignItems={'center'} direction={'row'} spacing={3}>
      <Skeleton width={'full'} isLoaded={!!options}>
        {options ? (
          <Select name={name} defaultValue={defaultValue} isDisabled={isDisabled || loading} ref={ref} {...restProps}>
            {options.map((option, index) => (
              <option key={name + '-' + index} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        ) : (
          <Select {...restProps} />
        )}
      </Skeleton>
      <IconButton
        onClick={fetch}
        size={'sm'}
        variant={'outline'}
        colorScheme={'gray'}
        title={buttonText}
        aria-label={buttonText}
        icon={<Refresh />}
        isLoading={loading}
        isDisabled={isDisabled}
      />
    </Stack>
  );
});

export { RemoteSelect };
