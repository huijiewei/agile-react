import { useControllableState, HTMLChakraProps } from '@chakra-ui/react';
import { ChangeEvent, ReactEventHandler, ReactNode, SyntheticEvent } from 'react';

type PageType = 'page' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis';

export type PaginationItemProps = {
  onClick: ReactEventHandler;
  type: PageType;
  page: number;
  isSelected: boolean;
  isDisabled: boolean;
};

export type UsePaginationProps = {
  total?: number;
  currentPage?: number;
  boundarySize?: number;
  siblingSize?: number;
  pageSize?: number;
  isDisabled?: boolean;
  onChange?: (event: ChangeEvent<unknown>, page: number) => void;
};

export type PaginationProps = HTMLChakraProps<'nav'> &
  UsePaginationProps & {
    showTotal?: boolean;
    showQuickJumper?: boolean;
    renderPage?: (page: PaginationItemProps) => ReactNode;
  };

type UsePagination = Omit<PaginationProps, keyof UsePaginationProps> & {
  pages: PaginationItemProps[];
};

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const usePagination = (props: PaginationProps): UsePagination => {
  const {
    total = 1,
    currentPage,
    boundarySize = 2,
    siblingSize = 2,
    pageSize = 20,
    isDisabled = false,
    onChange,
    ...restProps
  } = props;

  const totalPage = Math.max(1, Math.ceil(total / pageSize));

  const [pageState, setPageState] = useControllableState<number>({
    value: currentPage,
    defaultValue: 1,
  });

  const onClick = (event: SyntheticEvent, value: number) => {
    if (!currentPage) {
      setPageState(value);
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  const startPages = range(1, Math.min(boundarySize, totalPage));
  const endPages = range(Math.max(totalPage - boundarySize + 1, boundarySize + 1), totalPage);

  const siblingsStart = Math.max(
    Math.min(pageState - siblingSize, totalPage - boundarySize - siblingSize * 2 - 1),
    boundarySize + 2
  );

  const siblingsEnd = Math.min(
    Math.max(pageState + siblingSize, boundarySize + siblingSize * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : totalPage - 1
  );

  // Basic list of items to render
  // e.g. itemList = ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next']
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const itemList: any[] = [
    ...['previous'],
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundarySize + 2
      ? ['start-ellipsis']
      : boundarySize + 1 < totalPage - boundarySize
      ? [boundarySize + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < totalPage - boundarySize - 1
      ? ['end-ellipsis']
      : totalPage - boundarySize > boundarySize
      ? [totalPage - boundarySize]
      : []),

    ...endPages,
    ...['next'],
  ];

  // Map the button type to its page number
  const buttonPage = (type: string) => {
    switch (type) {
      case 'previous':
        return pageState - 1;
      case 'next':
        return pageState + 1;
      case 'start-ellipsis':
        return Math.max(1, pageState - 5);
      case 'end-ellipsis':
        return Math.min(totalPage, pageState + 5);
      default:
        return 0;
    }
  };

  const pages = itemList.map((page) => {
    return typeof page === 'number'
      ? {
          onClick: (event: SyntheticEvent) => {
            onClick(event, page);
          },
          type: 'page',
          page: page,
          isSelected: page === pageState,
          isDisabled,
        }
      : {
          onClick: (event: SyntheticEvent) => {
            onClick(event, buttonPage(page));
          },
          type: page,
          page: buttonPage(page),
          isSelected: false,
          isDisabled:
            isDisabled ||
            (page.indexOf('ellipsis') === -1 && (page === 'next' ? pageState >= totalPage : pageState <= 1)),
        };
  });

  return {
    pages,
    ...restProps,
  };
};

export { usePagination };
