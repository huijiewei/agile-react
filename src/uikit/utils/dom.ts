import { Booleanish } from '@uikit/utils/types';

export const dataAttr = (condition: boolean | undefined): Booleanish => {
  return (condition ? '' : undefined) as Booleanish;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const clsx = (...classNames: any[]): string => {
  return classNames.filter(Boolean).join(' ');
};
