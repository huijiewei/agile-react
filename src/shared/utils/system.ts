import { UnionStringArray } from '@shared/utils/types';
import { omit } from '@shared/utils/object';
import { ElementType } from 'react';

export const domElements = [
  'a',
  'b',
  'article',
  'aside',
  'blockquote',
  'button',
  'caption',
  'cite',
  'circle',
  'code',
  'dd',
  'div',
  'dl',
  'dt',
  'fieldset',
  'figcaption',
  'figure',
  'footer',
  'form',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'header',
  'hr',
  'img',
  'input',
  'kbd',
  'label',
  'li',
  'main',
  'mark',
  'nav',
  'ol',
  'p',
  'path',
  'pre',
  'q',
  'rect',
  's',
  'svg',
  'section',
  'select',
  'strong',
  'small',
  'span',
  'sub',
  'sup',
  'table',
  'tbody',
  'td',
  'textarea',
  'tfoot',
  'th',
  'thead',
  'tr',
  'ul',
] as const;

export type DOMElements = UnionStringArray<typeof domElements>;

export type As<Props = unknown> = ElementType<Props>;

export interface ThemingProps {
  variant?: string;
  size?: string;
  colorScheme?: string;
  orientation?: 'vertical' | 'horizontal';
}

export const omitThemingProps = <T extends ThemingProps>(props: T): T => {
  return omit(props, ['size', 'variant', 'colorScheme']);
};
