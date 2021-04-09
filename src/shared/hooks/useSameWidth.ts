import { MutableRefObject, useEffect, useRef } from 'react';

type SameWidthRef = {
  element: HTMLElement | null;
  childrenClassName: string;
};

const useSameWidth = (): { sameWidthRefs: MutableRefObject<SameWidthRef[]> } => {
  const sameWidthRefs = useRef<SameWidthRef[]>([]);

  useEffect(() => {
    sameWidthRefs.current.map((ref) => {
      if (ref.element == null || ref.element.dataset.sameWidth == 'DONE') {
        return;
      }

      const items = ref.element.querySelectorAll<HTMLElement>(`.${ref.childrenClassName}`);

      if (items.length < 2) {
        return;
      }

      let maxWidth = 0;

      for (const item of items) {
        const width = item.offsetWidth;

        if (width > maxWidth) {
          maxWidth = width;
        }
      }

      for (const item of items) {
        item.style.width = maxWidth + 2 + 'px';
      }

      ref.element.dataset.sameWidth = 'DONE';
    });
  });

  return {
    sameWidthRefs,
  };
};

export { useSameWidth };
