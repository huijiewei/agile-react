import { FC, ReactNode } from 'react';
import { __DEV__ } from '@shared/utils/assertion';
import { createContext } from '@shared/utils/react';

interface PortalManagerContext {
  zIndex?: number;
}

const [PortalManagerProvider, usePortalManager] = createContext<PortalManagerContext | null>({
  strict: false,
  name: 'PortalManagerContext',
});

export { usePortalManager };

export interface PortalManagerProps {
  children?: ReactNode;
  zIndex?: number;
}

const PortalManager: FC = (props: PortalManagerProps) => {
  const { children, zIndex } = props;
  return <PortalManagerProvider value={{ zIndex }}>{children}</PortalManagerProvider>;
};

if (__DEV__) {
  PortalManager.displayName = 'PortalManager';
}

export default PortalManager;
