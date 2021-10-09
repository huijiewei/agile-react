import { forwardRef, IconButton, Select, SelectProps, Skeleton, Stack } from '@chakra-ui/react';
import { ReactNode, useCallback, useEffect, useState } from 'react';
import { Refresh } from '@icon-park/react';
import { useMountedState } from '@shared/hooks/useMountedState';

type Option = {
  value: string | number | readonly string[] | undefined;
  label: ReactNode;
};

type RemoteSelectProps = SelectProps & {
  buttonText?: string;
  loadOptions: () => Promise<Option[] | undefined>;
};

const RemoteSelect = forwardRef<RemoteSelectProps, 'select'>((props, ref) => {
  const { id, name, defaultValue, loadOptions, buttonText = '刷新选项数据', isDisabled, ...restProps } = props;

  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<Option[] | undefined>();
  const isMounted = useMountedState();

  const fetch = useCallback<() => void>(async () => {
    setLoading(true);

    const options = await loadOptions();

    if (isMounted()) {
      setOptions(options);
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack alignItems={'center'} direction={'row'} spacing={3}>
      <Skeleton width={'full'} isLoaded={!!options}>
        {options ? (
          <Select
            id={id}
            name={name}
            defaultValue={defaultValue}
            isDisabled={isDisabled || loading}
            ref={ref}
            {...restProps}
          >
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
