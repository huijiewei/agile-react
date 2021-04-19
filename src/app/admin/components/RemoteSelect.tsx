import { forwardRef, IconButton, Select, SelectProps, Skeleton, Stack } from '@chakra-ui/react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Refresh } from '@icon-park/react';

type Option = {
  value: string | number | readonly string[] | undefined;
  label: ReactNode;
};

type RemoteSelectProps = SelectProps & {
  buttonTitle?: string;
  loadOptions: () => Promise<Option[] | undefined>;
};

const RemoteSelect = forwardRef<RemoteSelectProps, 'select'>((props, ref) => {
  const { name, loadOptions, buttonTitle = '刷新选项数据', isDisabled, ...restProps } = props;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[] | void>();

  const reload = useCallback<() => void>(async () => {
    setLoading(true);

    const options = await loadOptions();

    setLoading(false);

    setOptions(options);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack alignItems={'center'} direction={'row'} spacing={3}>
      {options ? (
        <Select isDisabled={isDisabled || loading} name={name} ref={ref} {...restProps}>
          {options.map((option, index) => (
            <option key={name + '-' + index} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
      ) : (
        <Skeleton width={'full'} height={10} />
      )}
      <IconButton
        onClick={reload}
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
