import {
  Box,
  BoxProps,
  Button,
  ButtonGroup,
  Divider,
  Input,
  InputAddon,
  InputGroup,
  Select,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { Dict } from '@shared/utils/types';
import { useCallback, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SearchField } from '@admin/services/types';

type SearchFormProps = BoxProps & {
  searchFields?: SearchField[];
};

const isPageQueryParam = (param: string) => {
  return param == 'page' || param == 'size';
};

const SearchForm = (props: SearchFormProps) => {
  const { handleSubmit, register } = useForm();

  const { searchFields, ...restProps } = props;

  const keywordFields = useMemo(() => {
    return searchFields ? searchFields.filter((field) => field.type == 'keyword') : [];
  }, [searchFields]);

  const otherFields = useMemo(() => {
    return searchFields ? searchFields.filter((field) => field.type != 'keyword') : [];
  }, [searchFields]);

  const isKeywordFieldName = useCallback(
    (fieldName: string) => {
      return (
        keywordFields?.find((field) => {
          return field.field === fieldName;
        }) != undefined
      );
    },
    [keywordFields]
  );

  const onSubmit = (formData: Dict[]) => {
    console.log(formData);
  };

  return (
    <Box {...restProps}>
      <Wrap justify={'right'} align={'center'} as={'form'} onSubmit={handleSubmit(onSubmit)}>
        {otherFields.map((field, index) => (
          <WrapItem key={'ko-' + index}>
            {field.type == 'br' && <Divider width={'full'} />}
            {field.type == 'select' && (
              <Select size={'sm'} {...register(field.field)} placeholder={field.label}>
                {field.options?.map((option: { value: string | number; description: string }) => (
                  <option key={field.field + '-' + option.value} value={option.value.toString()}>
                    {option.description}
                  </option>
                ))}
              </Select>
            )}
          </WrapItem>
        ))}
        <WrapItem>
          <InputGroup size={'sm'} marginEnd={3}>
            <InputAddon paddingX={0}>
              <Select {...register('keywordField')} borderWidth={0} size={'sm'}>
                {keywordFields.map((field) => (
                  <option key={'kof-' + field.field} value={field.field}>
                    {field.label}
                  </option>
                ))}
              </Select>
            </InputAddon>
            <Input {...register('keywordValue')} type={'text'} />
          </InputGroup>
        </WrapItem>{' '}
        <WrapItem>
          <ButtonGroup spacing={3} size={'sm'} variant={'outline'}>
            <Button type={'submit'}>搜索</Button>
            <Button colorScheme={'gray'} type={'reset'}>
              重置
            </Button>
          </ButtonGroup>
        </WrapItem>
      </Wrap>
    </Box>
  );
};

const useSearchForm = () => {
  const [searchFields, setSearchFieldsState] = useState<SearchField[]>();

  const setSearchFields = (searchFields: SearchField[] | undefined) => {
    if (searchFields) {
      setSearchFieldsState(searchFields);
    }
  };

  return {
    searchFields,
    setSearchFields,
  };
};

export { SearchForm, useSearchForm };
