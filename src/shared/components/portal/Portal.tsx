import { createPortal } from 'react-dom';
import { FC, ReactNode, RefObject, useMemo, useRef } from 'react';
import { useSafeLayoutEffect } from '@shared/hooks/useSafeLayoutEffect';
import { usePortalManager } from '@shared/components/portal/PortalManager';
import { useForceUpdate } from '@shared/hooks/useForceUpdate';
import { canUseDOM, createElement } from '@shared/utils/dom';
import { __DEV__ } from '@shared/utils/assertion';
import { createContext } from '@shared/utils/react';

type PortalContext = HTMLDivElement | null;

const [PortalContextProvider, usePortalContext] = createContext<PortalContext>({
  strict: false,
  name: 'PortalContext',
});

const PORTAL_CLASSNAME = 'ag-portal';

const Container: FC<{ zIndex: number }> = (props) => {
  const { children, zIndex } = props;

  const _classNames = `ag-portal-z absolute inset-0 z-${zIndex}`;

  return <div className={_classNames}>{children}</div>;
};

const DefaultPortal: FC<{ appendToParentPortal?: boolean }> = (props) => {
  const { appendToParentPortal, children } = props;

  const tempNode = useRef<HTMLDivElement | null>(null);
  const portal = useRef<HTMLDivElement | null>(null);

  const forceUpdate = useForceUpdate();

  const parentPortal = usePortalContext();
  const manager = usePortalManager();

  useSafeLayoutEffect(() => {
    const doc = tempNode.current?.ownerDocument;

    if (!doc) {
      return;
    }

    const host = appendToParentPortal ? parentPortal ?? doc.body : doc.body;

    if (!host) {
      return;
    }

    portal.current = createElement(doc, 'div', PORTAL_CLASSNAME);

    host.appendChild(portal.current);
    forceUpdate();

    const portalNode = portal.current;

    return () => {
      if (host.contains(portalNode)) {
        host.removeChild(portalNode);
      }
    };
  }, []);

  const _children = manager?.zIndex ? <Container zIndex={manager?.zIndex}>{children}</Container> : children;

  return portal.current ? (
    createPortal(
      <PortalContextProvider value={portal.current}>{_children}</PortalContextProvider>,
      portal.current as HTMLDivElement
    )
  ) : (
    <span ref={tempNode} />
  );
};

interface ContainerPortalProps {
  containerRef: RefObject<HTMLElement | null>;
  appendToParentPortal?: boolean;
}

const ContainerPortal: FC<ContainerPortalProps> = (props) => {
  const { children, containerRef, appendToParentPortal } = props;
  const containerEl = containerRef.current;
  const host = containerEl ?? (canUseDOM() ? document.body : undefined);

  const portal = useMemo(() => {
    return createElement(containerEl?.ownerDocument, 'div', PORTAL_CLASSNAME);
  }, [containerEl]);

  const forceUpdate = useForceUpdate();

  useSafeLayoutEffect(() => {
    forceUpdate();
  }, []);

  useSafeLayoutEffect(() => {
    if (!portal || !host) {
      return;
    }

    host.appendChild(portal);

    return () => {
      host.removeChild(portal);
    };
  }, [portal, host]);

  if (host && portal) {
    return createPortal(
      <PortalContext.Provider value={appendToParentPortal ? portal : null}>{children}</PortalContext.Provider>,
      portal
    );
  }

  return null;
};

export interface PortalProps {
  containerRef?: RefObject<HTMLElement | null>;
  children: ReactNode;
  appendToParentPortal?: boolean;
}

const Portal: FC = (props: PortalProps) => {
  const { containerRef, ...rest } = props;
  return containerRef ? <ContainerPortal containerRef={containerRef} {...rest} /> : <DefaultPortal {...rest} />;
};

Portal.defaultProps = {
  appendToParentPortal: true,
};

if (__DEV__) {
  Portal.displayName = 'Portal';
}

export default Portal;
