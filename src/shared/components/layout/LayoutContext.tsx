import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

type LayoutBase = {
  asideWidth: string;
  headerHeight: string;
  backgroundColor: string;
  asideBackgroundColor: string;
  headerBackgroundColor: string;
};

export type LayoutState = LayoutBase & {
  asideDisplay: 'block' | 'none';
};

type LayoutProviderProps = LayoutBase & {
  asideCollapsedWidth: string;
};

type LayoutAsideDispatch = {
  toggleAsideState: () => void;
};

type LayoutDispatchContextType = Dispatch<SetStateAction<boolean>>;

const LayoutStateContext = createContext<LayoutState | undefined>(undefined);
const LayoutAsideStateContext = createContext<boolean>(false);
const LayoutAsideDispatchContext = createContext<LayoutDispatchContextType | undefined>(undefined);

const LayoutAsideProvider = ({ children }: { children: ReactNode }) => {
  const [layoutAsideState, setLayoutAsideState] = useState<boolean>(true);

  return (
    <LayoutAsideDispatchContext.Provider value={setLayoutAsideState}>
      <LayoutAsideStateContext.Provider value={layoutAsideState}>{children}</LayoutAsideStateContext.Provider>
    </LayoutAsideDispatchContext.Provider>
  );
};

export const LayoutProvider = ({ children, ...layoutState }: PropsWithChildren<LayoutProviderProps>) => {
  return (
    <LayoutStateContext.Provider value={layoutState}>
      <LayoutAsideProvider>{children}</LayoutAsideProvider>
    </LayoutStateContext.Provider>
  );
};

export const useLayoutState = (): LayoutState => {
  const layoutState = useContext(LayoutStateContext);

  if (layoutState === undefined) {
    throw new Error('useLayoutState must be used within a LayoutProvider');
  }

  return layoutState;
};

export const useLayoutAsideDispatch = (): LayoutAsideDispatch => {
  const layoutDispatch = useContext(LayoutAsideDispatchContext);

  if (layoutDispatch === undefined) {
    throw new Error('useLayoutDispatch must be used within a LayoutProvider');
  }

  const toggleAsideState = useCallback(() => {
    layoutDispatch((prevState) => !prevState);
  }, [layoutDispatch]);

  return { toggleAsideState };
};
