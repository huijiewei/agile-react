import { isBrowser } from '@chakra-ui/utils';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

type ScrollToHashOptions = ScrollToOptions & {
  hash?: string;
};

const getScrollPosition = (hash: string, offset: ScrollToOptions) => {
  if (hash.length >= 2) {
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

  if ('scrollBehavior' in document.documentElement.style) window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(
      scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset,
      scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset
    );
  }
};

const RouterScroll = (): null => {
  if (isBrowser && 'scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
  }

  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    scrollToPosition({ hash: hash, left: 0, top: 0, behavior: 'smooth' });
  }, [pathname, search, hash]);

  return null;
};

export { RouterScroll };
