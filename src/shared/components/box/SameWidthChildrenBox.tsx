import { Box, BoxProps } from '@chakra-ui/react';
import { useEffect, useRef } from 'react';

type SameWidthChildrenBoxProps = BoxProps & {
  childrenClassName: string;
};

const sameWidth = (element: HTMLElement, childrenClassName: string) => {
  if (element.dataset.sameWidth == 'DONE') {
    return;
  }

  const children = element.querySelectorAll<HTMLElement>(`.${childrenClassName}`);

  if (children.length < 2) {
    element.dataset.sameWidth = 'DONE';

    return;
  }

  let maxWidth = 0;

  for (const child of children) {
    const width = child.offsetWidth;

    if (width > maxWidth) {
      maxWidth = width;
    }
  }

  for (const child of children) {
    child.style.width = maxWidth + 2 + 'px';
  }

  element.dataset.sameWidth = 'DONE';
};

const SameWidthChildrenBox = (props: SameWidthChildrenBoxProps): JSX.Element => {
  const { children, childrenClassName, ...restProps } = props;

  const sameWidthCallback = (e: HTMLDivElement) => {
    sameWidth(e, childrenClassName);
  };

  return (
    <Box ref={sameWidthCallback} {...restProps}>
      {children}
    </Box>
  );
};

export { SameWidthChildrenBox };
