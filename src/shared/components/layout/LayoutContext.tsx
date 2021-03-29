import { createContext, Dispatch, PropsWithChildren, SetStateAction, useCallback, useContext, useState } from 'react';

export type LayoutState = {
  asideWidth: string;
  asideCollapsedWidth: string;
  asideBackgroundColor: string;
  headerHeight: string;
  headerBackgroundColor: string;
  asideDefaultState: LayoutAsideState;
};

export enum LayoutAsideState {
  HIDDEN,
  EXPANDED,
  COLLAPSED,
}

type LayoutAsideDispatch = {
  setAsideState: (collapsed: LayoutAsideState) => void;
};

type LayoutDispatchContextType = Dispatch<SetStateAction<LayoutAsideState>>;

const LayoutStateContext = createContext<LayoutState | undefined>(undefined);
const LayoutAsideStateContext = createContext<LayoutAsideState | undefined>(undefined);
const LayoutAsideDispatchContext = createContext<LayoutDispatchContextType | undefined>(undefined);

export const LayoutProvider = ({ children, ...layoutState }: PropsWithChildren<LayoutState>) => {
  const [layoutAsideState, setLayoutAsideState] = useState<LayoutAsideState>(layoutState.asideDefaultState);

  return (
    <LayoutStateContext.Provider value={layoutState}>
      <LayoutAsideDispatchContext.Provider value={setLayoutAsideState}>
        <LayoutAsideStateContext.Provider value={layoutAsideState}>{children}</LayoutAsideStateContext.Provider>
      </LayoutAsideDispatchContext.Provider>
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

export const useLayoutAsideState = (): LayoutAsideState => {
  const layoutAsideState = useContext(LayoutAsideStateContext);

  if (layoutAsideState === undefined) {
    throw new Error('useLayoutAsideState must be used within a LayoutProvider');
  }

  return layoutAsideState;
};

export const useLayoutAsideDispatch = (): LayoutAsideDispatch => {
  const layoutDispatch = useContext(LayoutAsideDispatchContext);

  if (layoutDispatch === undefined) {
    throw new Error('useLayoutDispatch must be used within a LayoutProvider');
  }

  const setAsideState = useCallback(
    (state: LayoutAsideState) => {
      layoutDispatch(state);
    },
    [layoutDispatch]
  );

  return { setAsideState };
};
