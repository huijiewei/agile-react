import { useControllableState } from '@chakra-ui/react';
import { UseClickableProps } from '@chakra-ui/clickable';
import { ChangeEvent, ReactEventHandler, useRef } from 'react';

export type UsePaginationItem = {
  onClick: ReactEventHandler;
  type: 'page' | 'next' | 'previous' | 'start-ellipsis' | 'end-ellipsis';
  page: number;
  isSelected: boolean;
  isDisabled: boolean;
};

type UsePaginationOptions = {
  total?: number;
  page?: number;
  pageSize?: number;
  boundaryCount?: number;
  siblingCount?: number;
  isDisabled?: boolean;
  onChange?: (event: ChangeEvent<unknown>, page: number) => void;
};

export type UsePaginationProps = Omit<UseClickableProps, 'color'> & UsePaginationOptions;

const usePagination = (props: UsePaginationProps) => {
  const {
    total = 1,
    page,
    pageSize = 20,
    boundaryCount = 2,
    siblingCount = 2,
    isDisabled = false,
    onChange,
    ...htmlProps
  } = props;

  const totalPage = Math.max(1, Math.ceil(total / pageSize));

  const [pageState, setPageState] = useControllableState({
    value: page,
    defaultValue: 1,
  });

  const onClick = (event, value) => {
    if (!page) {
      setPageState(value);
    }

    if (onChange) {
      onChange(event, value);
    }
  };

  const range = (start: number, end: number) => {
    const length = end - start + 1;
    return Array.from({ length }, (_, i) => start + i);
  };

  const startPages = range(1, Math.min(boundaryCount, totalPage));
  const endPages = range(Math.max(totalPage - boundaryCount + 1, boundaryCount + 1), totalPage);

  const siblingsStart = Math.max(
    Math.min(pageState - siblingCount, totalPage - boundaryCount - siblingCount * 2 - 1),
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(pageState + siblingCount, boundaryCount + siblingCount * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : totalPage - 1
  );

  // Basic list of items to render
  // e.g. itemList = ['previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next']
  const itemList = [
    ...['previous'],
    ...startPages,

    // Start ellipsis
    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis']
      : boundaryCount + 1 < totalPage - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    ...(siblingsEnd < totalPage - boundaryCount - 1
      ? ['end-ellipsis']
      : totalPage - boundaryCount > boundaryCount
      ? [totalPage - boundaryCount]
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
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  const pages = itemList.map((page) => {
    return typeof page === 'number'
      ? {
          onClick: (event) => {
            onClick(event, page);
          },
          type: 'page',
          page: page,
          isSelected: page === pageState,
          isDisabled,
          'aria-current': page === pageState ? 'true' : undefined,
        }
      : {
          onClick: (event) => {
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
    ...htmlProps,
  };
};

export { usePagination };
