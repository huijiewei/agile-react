import { useHistory } from '@shared/components/router/BrowserRouter';
import { useEffect } from 'react';

type ScrollToHashOptions = ScrollToOptions & {
  hash?: string;
};

export const computeScrollPosition = (): ScrollToOptions => ({
  left: window.pageXOffset,
  top: window.pageYOffset,
});

const getScrollPosition = (hash: string, offset: ScrollToOptions) => {
  if (hash.length < 2) {
    return offset as ScrollToOptions;
  }

  const elem = document.getElementById(hash.slice(1));

  if (!elem) {
    return offset as ScrollToOptions;
  }

  const docRect = document.documentElement.getBoundingClientRect();
  const elemRect = elem.getBoundingClientRect();

  return {
    behavior: offset.behavior,
    left: elemRect.left - docRect.left - (offset.left || 0),
    top: elemRect.top - docRect.top - (offset.top || 0),
  };
};

const scrollToPosition = (position: ScrollToHashOptions): void => {
  const scrollToOptions = getScrollPosition(position.hash || '', position);

  if ('scrollBehavior' in document.documentElement.style) {
    window.scrollTo(scrollToOptions);
  } else {
    window.scrollTo(scrollToOptions.left || window.pageXOffset, scrollToOptions.top || window.pageYOffset);
  }
};

const scrollPositions = new Map<string, ScrollToOptions>();

export const saveScrollPosition = (key: string, scrollPosition: ScrollToOptions): void => {
  scrollPositions.set(key, scrollPosition);
};

const RouterScroll = (): null => {
  const browserHistory = useHistory();

  useEffect(() => {
    const removeHistoryListener = browserHistory.listen(({ action, location }) => {
      const toPosition = (action == 'POP' ? scrollPositions.get(browserHistory.createHref(location)) : undefined) || {
        hash: location.hash,
        left: 0,
        top: 0,
      };

      scrollToPosition(toPosition);
    });

    return () => removeHistoryListener();
  }, [browserHistory]);

  return null;
};

export { RouterScroll };
