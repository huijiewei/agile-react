import { MutatorCallback } from 'swr/dist/types';
import { User } from '@admin/services/useUser';
import { HttpMessage } from '@shared/contexts/HttpContext';
import { HttpError } from '@shared/utils/http';

export type SearchField = {
  type: 'keyword' | 'br' | 'select' | 'dateTimeRange';
  field: string;
  label: string;
  multiple?: boolean;
  options?: { value: string; description: string }[];
  rangeType?: string;
  shortcuts?: { text: string; start: string; end: string }[];
  labelStart?: string;
  labelEnd?: string;
};

export type ListResponse<T> = {
  items: T[];
  searchFields?: SearchField[];
};

export type PageResponse<T> = ListResponse<T> & {
  pages: {
    currentPage: number;
    pageCount: number;
    perPage: number;
    totalCount: number;
  };
};

export type UseAll<T> = {
  loading: boolean;
  data: T | undefined;
  mutate: (
    data?: T | Promise<T> | MutatorCallback<T> | undefined,
    shouldRevalidate?: boolean | undefined
  ) => Promise<T | undefined>;
};

export type UseView<T> = {
  data: T | undefined;
  loading: boolean;
  mutate: (
    data?: T | Promise<T | undefined> | MutatorCallback<T | undefined> | undefined,
    shouldRevalidate?: boolean | undefined
  ) => Promise<T | undefined>;
};

export type UseDelete = { loading: boolean } & {
  [key: string]: (id: number) => Promise<{ data: HttpMessage | undefined; error: HttpError | undefined }>;
};
