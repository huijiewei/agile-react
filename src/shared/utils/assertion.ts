export const __DEV__ = process.env.NODE_ENV !== 'production';

const buttonInputTypes = ['button', 'color', 'file', 'image', 'reset', 'submit'];

export const isBrowser = (): boolean => {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
};

export const isButton = (element: Element): element is HTMLButtonElement | HTMLInputElement => {
  if (element.tagName === 'BUTTON') return true;
  if (element.tagName === 'INPUT') {
    const input = element as HTMLInputElement;
    return buttonInputTypes.indexOf(input.type) !== -1;
  }
  return false;
};
