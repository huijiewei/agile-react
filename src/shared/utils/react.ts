import { isBrowser } from '@shared/utils/assertion';
import {
  ComponentPropsWithRef,
  ElementType,
  forwardRef,
  MutableRefObject,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useLayoutEffect,
  WeakValidationMap,
} from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type As<BaseProps = any> = ElementType<BaseProps>;

type PropsWithAs<ComponentType extends As, ComponentProps> = ComponentProps &
  Omit<ComponentPropsWithRef<ComponentType>, 'as' | keyof ComponentProps> & {
    as?: ComponentType;
  };

type PropsFromAs<ComponentType extends As, ComponentProps> = (PropsWithAs<ComponentType, ComponentProps> & {
  as: ComponentType;
}) &
  PropsWithAs<ComponentType, ComponentProps>;

type ExoticComponentWithAs<DefaultComponentType extends As, ComponentProps> = {
  (props: PropsWithAs<DefaultComponentType, ComponentProps>): ReactElement | null;
  <ComponentType extends As>(
    props: PropsWithAs<ComponentType, ComponentProps> & {
      as: ComponentType;
    }
  ): ReactElement | null;

  readonly $$typeof: symbol;
};

type NamedExoticComponentWithAs<DefaultComponentType extends As, ComponentProps> = ExoticComponentWithAs<
  DefaultComponentType,
  ComponentProps
> & {
  displayName?: string;
};

type ForwardRefExoticComponentWithAs<DefaultComponentType extends As, ComponentProps> = NamedExoticComponentWithAs<
  DefaultComponentType,
  ComponentProps
> & {
  defaultProps?: Partial<PropsWithAs<DefaultComponentType, ComponentProps>>;
  propTypes?: WeakValidationMap<PropsWithAs<DefaultComponentType, ComponentProps>>;
};

type ElementTagNameMap = HTMLElementTagNameMap &
  Pick<SVGElementTagNameMap, Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>>;

type ForwardRefWithAsRenderFunction<DefaultComponentType extends As, ComponentProps = Record<string, never>> = {
  (
    props: PropsWithChildren<PropsFromAs<DefaultComponentType, ComponentProps>>,
    ref:
      | ((
          instance: // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (DefaultComponentType extends keyof ElementTagNameMap ? ElementTagNameMap[DefaultComponentType] : any) | null
        ) => void)
      | MutableRefObject<
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (DefaultComponentType extends keyof ElementTagNameMap ? ElementTagNameMap[DefaultComponentType] : any) | null
        >
      | null
  ): ReactElement | null;
  displayName?: string;
  defaultProps?: never;
  propTypes?: never;
};

export const forwardRefWithAs = <Props, Component extends As>(
  render: ForwardRefWithAsRenderFunction<Component, Props>
): ForwardRefExoticComponentWithAs<Component, Props> => {
  return forwardRef(render) as ForwardRefExoticComponentWithAs<Component, Props>;
};

export const useIsomorphicLayoutEffect = isBrowser() ? useLayoutEffect : useEffect;
