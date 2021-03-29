import { Box } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { LayoutAsideState, LayoutProvider, useLayoutState } from './LayoutContext';
import { noScrollbarsClassName } from 'react-remove-scroll-bar';

const LayoutHeader = ({ children }: { children: ReactNode }) => {
  const { headerHeight, headerBackgroundColor } = useLayoutState();
  return (
    <Box
      as="header"
      backgroundColor={headerBackgroundColor}
      className={noScrollbarsClassName}
      boxShadow="sm"
      zIndex="docked"
      height={headerHeight}
      position="fixed"
      top="0"
      right="0"
      left="0"
    >
      {children}
    </Box>
  );
};

const LayoutAside = ({ children }: { children: ReactNode }) => {
  const { asideBackgroundColor, asideWidth, asideCollapsedWidth, headerHeight } = useLayoutState();

  return (
    <Box
      as="aside"
      backgroundColor={asideBackgroundColor}
      position="fixed"
      zIndex="docked"
      display={['none', 'none', 'none', 'block']}
      top={headerHeight}
      width={[asideWidth, asideWidth, asideWidth, asideCollapsedWidth, asideWidth]}
    >
      {children}
    </Box>
  );
};

const LayoutContent = ({ children }: { children: ReactNode }) => {
  const { asideWidth, asideCollapsedWidth, headerHeight } = useLayoutState();

  return (
    <Box marginTop={headerHeight} padding="5" marginStart={[0, 0, 0, asideCollapsedWidth, asideWidth]}>
      {children}
    </Box>
  );
};

const LayoutResponsive = ({ children, backgroundColor }: { children: ReactNode; backgroundColor: string }) => {
  return (
    <Box backgroundColor={backgroundColor} display="block">
      {children}
    </Box>
  );
};

type LayoutProp = {
  asideWidth: string;
  asideCollapsedWidth: string;
  asideBackgroundColor: string;
  headerHeight: string;
  headerBackgroundColor: string;
  backgroundColor: string;
};

const Layout = ({ children, ...layoutProps }: PropsWithChildren<LayoutProp>) => {
  return (
    <LayoutProvider
      headerHeight={layoutProps.headerHeight}
      headerBackgroundColor={layoutProps.headerBackgroundColor}
      asideWidth={layoutProps.asideWidth}
      asideCollapsedWidth={layoutProps.asideCollapsedWidth}
      asideBackgroundColor={layoutProps.asideBackgroundColor}
      asideDefaultState={LayoutAsideState.EXPANDED}
    >
      <LayoutResponsive backgroundColor={layoutProps.backgroundColor}>{children}</LayoutResponsive>
    </LayoutProvider>
  );
};

export { Layout, LayoutHeader, LayoutAside, LayoutContent };
