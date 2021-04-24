// adapted from @radix-ui/react-polymorphic

import {
  ComponentPropsWithRef,
  ElementType,
  JSXElementConstructor,
  ReactElement,
  ForwardRefExoticComponent as ReactForwardRefExoticComponent,
} from 'react';
import { Merge } from './types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
type OwnProps<E> = E extends ForwardRefComponent<any, infer P> ? P : {};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IntrinsicElement<E> = E extends ForwardRefComponent<infer I, any> ? I : never;

type NarrowIntrinsic<E> = E extends keyof JSX.IntrinsicElements ? E : never;

type ForwardRefExoticComponent<E, OwnProps> = ReactForwardRefExoticComponent<
  Merge<E extends ElementType ? ComponentPropsWithRef<E> : never, OwnProps & { as?: E }>
>;

// eslint-disable-next-line @typescript-eslint/ban-types
interface ForwardRefComponent<IntrinsicElementString, OwnProps = {}>
  extends ForwardRefExoticComponent<IntrinsicElementString, OwnProps> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <As extends keyof JSX.IntrinsicElements | JSXElementConstructor<any> = NarrowIntrinsic<IntrinsicElementString>>(
    props: As extends keyof JSX.IntrinsicElements
      ? Merge<JSX.IntrinsicElements[As], OwnProps & { as: As }>
      : As extends JSXElementConstructor<infer P>
      ? Merge<P, OwnProps & { as: As }>
      : never
  ): ReactElement | null;
}

export type { ForwardRefComponent, OwnProps, IntrinsicElement, Merge };
