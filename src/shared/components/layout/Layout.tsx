import { Box } from '@chakra-ui/react';
import { PropsWithChildren, ReactNode } from 'react';
import { LayoutProvider, LayoutState, useLayoutState } from './LayoutContext';
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
  const { headerHeight, asideWidth, asideColor, asideCollapsedWidth, asideBackgroundColor } = useLayoutState();

  return (
    <Box
      as="aside"
      backgroundColor={asideBackgroundColor}
      color={asideColor}
      position="fixed"
      zIndex="docked"
      display={['none', 'none', 'none', 'block']}
      top={headerHeight}
      bottom="0"
      width={[asideWidth, asideWidth, asideWidth, asideCollapsedWidth, asideWidth]}
      boxShadow="sm"
    >
      {children}
    </Box>
  );
};

const LayoutContent = ({ children }: { children: ReactNode }) => {
  const { asideWidth, asideCollapsedWidth, headerHeight } = useLayoutState();

  return (
    <Box
      height={`calc(100vh - ${headerHeight} )`}
      marginTop={headerHeight}
      padding="5"
      marginStart={[0, 0, 0, asideCollapsedWidth, asideWidth]}
    >
      {children}
    </Box>
  );
};

const LayoutRoot = ({ children }: { children: ReactNode }) => {
  const { backgroundColor } = useLayoutState();
  return (
    <Box backgroundColor={backgroundColor} display="block">
      {children}
    </Box>
  );
};

type LayoutProp = LayoutState;

const Layout = ({ children, ...layoutProps }: PropsWithChildren<LayoutProp>) => {
  return (
    <LayoutProvider
      backgroundColor={layoutProps.backgroundColor}
      headerHeight={layoutProps.headerHeight}
      headerBackgroundColor={layoutProps.headerBackgroundColor}
      asideWidth={layoutProps.asideWidth}
      asideColor={layoutProps.asideColor}
      asideCollapsedWidth={layoutProps.asideCollapsedWidth}
      asideBackgroundColor={layoutProps.asideBackgroundColor}
    >
      <LayoutRoot>{children}</LayoutRoot>
    </LayoutProvider>
  );
};

export { Layout, LayoutHeader, LayoutAside, LayoutContent };
