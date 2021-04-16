import { Box, BoxProps, Button, ButtonGroup, Divider, Input, InputAddon, InputGroup } from '@chakra-ui/react';
import { Dict } from '@shared/utils/types';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SearchField } from '@admin/services/types';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import { To } from 'history';
import { DynamicSelect } from '@shared/components/select/DynamicSelect';

type SearchFormProps = BoxProps & {
  searchFields?: SearchField[];
};

type SearchData = {
  keywordField: string;
  keywordValue: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
};

const SearchForm = (props: SearchFormProps) => {
  const { searchFields, ...restProps } = props;

  const location = useLocation();
  const navigate = useNavigate();

  const [initData, setInitData] = useState<Dict>();
  const [routeQuery, setRouteQuery] = useState<ParsedQuery>();
  const [searchData, setSearchData] = useState<SearchData>({
    keywordField: '',
    keywordValue: '',
  });

  const { handleSubmit, register, reset } = useForm();

  const keywordFields = useMemo(() => {
    return searchFields?.filter((field) => field.type == 'keyword');
  }, [searchFields]);

  const otherFields = useMemo(() => {
    return searchFields?.filter((field) => field.type != 'keyword');
  }, [searchFields]);

  useEffect(() => {
    setRouteQuery(queryString.parse(location.search));
  }, [location.search]);

  useEffect(() => {
    const initKeywordField = keywordFields?.[0].field || '';

    const searchData: SearchData = { keywordField: '', keywordValue: '' };
    const initData: Dict = { keywordField: initKeywordField, keywordValue: '' };

    keywordFields?.forEach((field) => {
      initData[field.field] = undefined;

      if (routeQuery && routeQuery[field.field]) {
        searchData.keywordField = field.field;
        searchData.keywordValue = routeQuery[field.field] as string;
      } else {
        searchData.keywordField = '';
        searchData.keywordValue = '';
      }
    });

    if (searchData.keywordField == '') {
      searchData.keywordField = initKeywordField;
    }

    otherFields?.forEach((field) => {
      if (field.type != 'br') {
        initData[field.field] = undefined;

        if (routeQuery && routeQuery[field.field]) {
          searchData[field.field] = routeQuery[field.field];
        } else {
          searchData[field.field] = '';
        }
      }
    });

    setInitData(initData);
    setSearchData(searchData);
  }, [routeQuery, keywordFields, otherFields, reset]);

  const navigateTo = (search: string) => {
    const to: To = {
      pathname: location.pathname,
      search: search == '' ? '' : '?' + search,
      hash: location.hash,
    };

    navigate(to);
  };

  const onSubmit = (formData: Dict) => {
    const data: Dict = {};

    for (const [key, value] of Object.entries(formData)) {
      if (
        key !== 'keywordField' &&
        key != 'keywordValue' &&
        !keywordFields?.some((field) => {
          return field.field === key;
        }) &&
        value &&
        value.length > 0
      ) {
        data[key] = value;
      }
    }

    if (routeQuery) {
      for (const [key, value] of Object.entries(routeQuery)) {
        if (
          !keywordFields?.some((field) => {
            return field.field === key;
          })
        ) {
          data[key] = value;
        }
      }
    }

    if (formData['keywordField'] != '' && formData['keywordValue'] != '') {
      data[formData['keywordField']] = formData['keywordValue'];
    }

    const search = queryString.stringify({ ...data, page: undefined });

    navigateTo(search);
  };

  const onReset = () => {
    reset(initData);

    const search = queryString.stringify({
      ...routeQuery,
      ...initData,
      keywordField: undefined,
      keywordValue: undefined,
      page: undefined,
    });

    navigateTo(search);
  };

  return (
    <Box {...restProps}>
      <Box
        display={'block'}
        verticalAlign={'middle'}
        textAlign={'right'}
        as={'form'}
        onReset={onReset}
        onSubmit={handleSubmit(onSubmit)}
      >
        {otherFields?.map((field, index) => (
          <Box marginStart={2} display={field.type == 'br' ? 'block' : 'inline-block'} key={'ko-' + index}>
            {field.type == 'br' && <Divider height={2} display={'block'} />}
            {field.type == 'select' && (
              <DynamicSelect
                defaultValue={searchData[field.field]}
                size={'sm'}
                {...register(field.field)}
                placeholder={field.label}
                options={field.options}
                optionRender={(option) => (
                  <option key={field.field + '-' + option.value} value={option.value.toString()}>
                    {option.description}
                  </option>
                )}
              />
            )}
            {field.type == 'dateTimeRange' && (
              <Input
                type={'date'}
                defaultValue={searchData[field.field]}
                size={'sm'}
                {...register(field.field)}
                placeholder={field.label}
              />
            )}
          </Box>
        ))}
        <Box marginStart={2} display={'inline-block'}>
          <InputGroup size={'sm'} marginEnd={3}>
            <InputAddon paddingX={0}>
              <DynamicSelect
                defaultValue={searchData.keywordField}
                {...register('keywordField')}
                borderWidth={0}
                size={'sm'}
                options={keywordFields}
                optionRender={(option) => (
                  <option key={'kof-' + option.field} value={option.field}>
                    {option.label}
                  </option>
                )}
              />
            </InputAddon>
            <Input {...register('keywordValue')} defaultValue={searchData.keywordValue} type={'text'} />
          </InputGroup>
        </Box>
        <Box marginStart={2} display={'inline-block'}>
          <ButtonGroup spacing={2} size={'sm'} variant={'outline'}>
            <Button type={'submit'}>搜索</Button>
            <Button colorScheme={'gray'} type={'reset'}>
              重置
            </Button>
          </ButtonGroup>
        </Box>
      </Box>
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
