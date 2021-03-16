export interface SearchField {
  type: 'keyword' | 'br' | 'select' | 'dateTimeRange';
  field: string;
  label: string;
  multiple?: boolean;
  options?: { value: string; description: string }[];
  rangeType?: string;
  shortcuts?: { text: string; start: string; end: string }[];
  labelStart?: string;
  labelEnd?: string;
}

export interface ListResponse<T> {
  items: T[];
  searchFields?: SearchField[];
}

export interface PageResponse<T> extends ListResponse<T> {
  pages: {
    currentPage: number;
    pageCount: number;
    perPage: number;
    totalCount: number;
  };
}
