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
import { useEffect, useMemo, useRef, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { SearchField } from '@admin/services/types';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString, { ParsedQuery } from 'query-string';
import { To } from 'history';

type SearchFormProps = BoxProps & {
  searchFields?: SearchField[];
};

const isPageField = (param: string) => {
  return param == 'page' || param == 'size';
};

const SearchForm = (props: SearchFormProps) => {
  console.log('SearchForm');

  const { searchFields, ...restProps } = props;

  const { handleSubmit, control, register, reset } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [initData, setInitData] = useState<Dict>();
  const [routeQuery, setRouteQuery] = useState<ParsedQuery>();
  const [searchData, setSearchData] = useState<Dict>();

  const keywordFields = useMemo(() => {
    return searchFields?.filter((field) => field.type == 'keyword');
  }, [searchFields]);

  const otherFields = useMemo(() => {
    return searchFields?.filter((field) => field.type != 'keyword' && field.type != 'br');
  }, [searchFields]);

  useEffect(() => {
    setRouteQuery(queryString.parse(location.search));
  }, [location.search]);

  useEffect(() => {
    const initKeywordField = keywordFields?.[0].field;

    const searchData: Dict = { keywordField: '', keywordValue: '' };
    const initData: Dict = { keywordField: initKeywordField, keywordValue: '' };

    keywordFields?.forEach((field) => {
      initData[field.field] = undefined;

      if (routeQuery && routeQuery[field.field]) {
        searchData.keywordField = field.field;
        searchData.keywordValue = routeQuery[field.field];
      }
    });

    if (searchData.keywordField == '') {
      searchData.keywordField = initKeywordField;
    }

    otherFields?.forEach((field) => {
      initData[field.field] = undefined;

      if (routeQuery && routeQuery[field.field]) {
        searchData[field.field] = routeQuery[field.field];
      }
    });

    setInitData(initData);
    setSearchData(searchData);
  }, [routeQuery, keywordFields, otherFields]);

  const onSubmit = (formData: Dict) => {
    const data: Dict = {};

    for (const [key, value] of Object.entries(formData)) {
      if (key !== 'keywordField' && key != 'keywordValue' && value && value.length > 0) {
        data[key] = value;
      }
    }

    if (formData['keywordField'] != '' && formData['keywordValue'] != '') {
      data[formData['keywordField']] = formData['keywordValue'];
    }

    const search = queryString.stringify({ ...routeQuery, ...data, page: undefined });

    const to: To = {
      pathname: location.pathname,
      search: search == '' ? '' : '?' + search,
      hash: location.hash,
    };

    navigate(to);
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

    const to: To = {
      pathname: location.pathname,
      search: search == '' ? '' : '?' + search,
      hash: location.hash,
    };

    navigate(to);
  };

  return (
    <Box {...restProps}>
      <Wrap justify={'right'} align={'center'} as={'form'} onReset={onReset} onSubmit={handleSubmit(onSubmit)}>
        {otherFields &&
          otherFields.map((field, index) => (
            <WrapItem key={'ko-' + index}>
              {field.type == 'br' && <Divider width={'full'} />}
              {field.type == 'select' && field.options && (
                <Select
                  defaultValue={searchData?.[field.field]}
                  size={'sm'}
                  {...register(field.field)}
                  placeholder={field.label}
                >
                  {field.options.map((option: { value: string | number; description: string }) => (
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
              {keywordFields && (
                <Select
                  defaultValue={searchData?.keywordField}
                  {...register('keywordField')}
                  borderWidth={0}
                  size={'sm'}
                >
                  {keywordFields.map((field) => (
                    <option key={'kof-' + field.field} value={field.field}>
                      {field.label}
                    </option>
                  ))}
                </Select>
              )}
            </InputAddon>
            <Input {...register('keywordValue')} defaultValue={searchData?.keywordValue} type={'text'} />
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
