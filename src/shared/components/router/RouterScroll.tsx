import { useHistory } from '@shared/components/router/BrowserRouter';
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { createPath } from 'history';
import { useConst } from '@chakra-ui/react';

type ScrollToHashOptions = ScrollToOptions & {
  hash?: string;
};

const computeScrollPosition = (): ScrollToOptions => ({
  left: window.scrollX,
  top: window.scrollY,
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
    window.scrollTo(scrollToOptions.left || window.scrollX, scrollToOptions.top || window.scrollY);
  }
};

const RouterScroll = (): null => {
  const browserHistory = useHistory();
  const location = useLocation();
  const prevPathRef = useRef<string | undefined>();
  const savedPositions = useConst(new Map<string, ScrollToOptions>());

  useLayoutEffect(() => {
    prevPathRef.current = createPath({ pathname: location.pathname, search: location.search, hash: location.hash });

    return () => {
      prevPathRef.current && savedPositions.set(prevPathRef.current, computeScrollPosition());
    };
  }, [location.pathname, location.search, location.hash, savedPositions]);

  useEffect(() => {
    const removeHistoryListener = browserHistory.listen(({ action, location }) => {
      const toPosition = (action == 'POP' ? savedPositions.get(createPath(location)) : undefined) || {
        hash: location.hash,
        left: 0,
        top: 0,
      };

      scrollToPosition(toPosition);
    });

    return () => removeHistoryListener();
  }, [browserHistory, savedPositions]);

  return null;
};

export { RouterScroll };
