import { Booleanish } from '@shared/utils/types';

const focusableElList = [
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  'embed',
  'iframe',
  'object',
  'a[href]',
  'area[href]',
  'button:not([disabled])',
  '[tabindex]',
  'audio[controls]',
  'video[controls]',
  '*[tabindex]:not([aria-disabled])',
  '*[contenteditable]',
];

const focusableElSelector = focusableElList.join();

export const hasTabIndex = (element: HTMLElement): boolean => element.hasAttribute('tabindex');

export const isHidden = (element: HTMLElement): boolean => {
  if (element.parentElement && isHidden(element.parentElement)) {
    return true;
  }

  return element.hidden;
};

export const isDisabled = (element: HTMLElement): boolean => {
  return Boolean(element.getAttribute('disabled')) || Boolean(element.getAttribute('aria-disabled'));
};

export const isContentEditable = (element: HTMLElement): boolean => {
  const value = element.getAttribute('contenteditable');

  return value !== 'false' && value != null;
};

export const isFocusable = (element: HTMLElement): boolean => {
  if (!isHTMLElement(element) || isHidden(element) || isDisabled(element)) {
    return false;
  }

  const { localName } = element;
  const focusableTags = ['input', 'select', 'textarea', 'button'];

  if (focusableTags.indexOf(localName) >= 0) {
    return true;
  }

  if (localName === 'a' && element.hasAttribute('href')) {
    return true;
  }

  if ((localName === 'audio' || localName === 'video') && element.hasAttribute('controls')) {
    return true;
  }

  if (isContentEditable(element)) {
    return true;
  }

  return hasTabIndex(element);
};

export const getOwnerWindow = (node?: HTMLElement | null): Window => {
  return node instanceof Element ? getOwnerDocument(node).defaultView ?? window : window;
};

export const getOwnerDocument = (node?: HTMLElement | null): Document => {
  return node instanceof Element ? node.ownerDocument ?? document : document;
};

export const getAllFocusable = <T extends HTMLElement>(container: T): T[] => {
  const focusableEls = Array.from(container.querySelectorAll<T>(focusableElSelector));
  focusableEls.unshift(container);
  return focusableEls.filter(isFocusable).filter((el) => window.getComputedStyle(el).display !== 'none');
};

export const canUseDOM = (): boolean => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

export const isHTMLElement = (element: unknown): element is HTMLElement => {
  return element instanceof HTMLElement;
};

export const dataAttr = (condition: boolean | undefined): Booleanish => (condition ? '' : undefined) as Booleanish;

export interface FocusableElement {
  focus(options?: FocusOptions): void;
}

const getActiveElement = (element: FocusableElement) => {
  const doc = element instanceof HTMLElement ? getOwnerDocument(element) : document;
  return doc.activeElement === (element as HTMLElement);
};

const isInputElement = (element: FocusableElement): element is HTMLInputElement => {
  return isHTMLElement(element) && element.tagName.toLowerCase() === 'input' && 'select' in element;
};

interface FocusProps extends FocusOptions {
  /**
   * Function that determines if the element is the active element
   */
  isActive?: typeof getActiveElement;
  /**
   * If true, the element will be focused in the next tick
   */
  nextTick?: boolean;
}

let supportsPreventScrollCached: boolean | null = null;

const supportsPreventScroll = () => {
  if (supportsPreventScrollCached == null) {
    supportsPreventScrollCached = false;
    try {
      const div = document.createElement('div');
      div.focus({
        get preventScroll() {
          supportsPreventScrollCached = true;
          return true;
        },
      });
    } catch (e) {}
  }

  return supportsPreventScrollCached;
};

interface ScrollableElement {
  element: HTMLElement;
  scrollTop: number;
  scrollLeft: number;
}

const getScrollableElements = (element: HTMLElement): ScrollableElement[] => {
  const doc = getOwnerDocument(element);
  let parent = element.parentNode;
  const scrollableElements: ScrollableElement[] = [];
  const rootScrollingElement = doc.scrollingElement || doc.documentElement;

  while (parent instanceof HTMLElement && parent !== rootScrollingElement) {
    if (parent.offsetHeight < parent.scrollHeight || parent.offsetWidth < parent.scrollWidth) {
      scrollableElements.push({
        element: parent,
        scrollTop: parent.scrollTop,
        scrollLeft: parent.scrollLeft,
      });
    }
    parent = parent.parentNode;
  }

  if (rootScrollingElement instanceof HTMLElement) {
    scrollableElements.push({
      element: rootScrollingElement,
      scrollTop: rootScrollingElement.scrollTop,
      scrollLeft: rootScrollingElement.scrollLeft,
    });
  }

  return scrollableElements;
};

const restoreScrollPosition = (scrollableElements: ScrollableElement[]) => {
  for (const { element, scrollTop, scrollLeft } of scrollableElements) {
    element.scrollTop = scrollTop;
    element.scrollLeft = scrollLeft;
  }
};

export const focus = (element: FocusableElement, options: FocusProps = {}): number => {
  const { isActive = getActiveElement, nextTick = true, preventScroll } = options;

  if (isActive(element)) {
    return -1;
  }

  const triggerFocus = () => {
    if (supportsPreventScroll()) {
      element.focus({ preventScroll });
    } else {
      element.focus();
      if (preventScroll) {
        const scrollableElements = getScrollableElements(element as HTMLElement);
        restoreScrollPosition(scrollableElements);
      }
    }

    if (isInputElement(element)) {
      element.select();
    }
  };

  if (nextTick) {
    return requestAnimationFrame(triggerFocus);
  }

  triggerFocus();

  return -1;
};

export const createElement = <T extends HTMLElement>(
  parent: Document | undefined,
  tag: string,
  className?: string
): T | null => {
  if (!parent) {
    return null;
  }

  const node = parent.createElement(tag);

  if (node && className) {
    node.className = className;
  }

  return node as T;
};
