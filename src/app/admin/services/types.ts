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
