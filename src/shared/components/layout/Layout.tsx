import { Box, BoxProps } from '@chakra-ui/react';
import { PropsWithChildren } from 'react';
import { LayoutProvider, LayoutState, useLayoutState } from './LayoutContext';
import { noScrollbarsClassName } from 'react-remove-scroll-bar';

const LayoutHeader = (props: BoxProps): JSX.Element => {
  const { children, ...restProps } = props;
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
      {...restProps}
    >
      {children}
    </Box>
  );
};

const LayoutAside = (props: BoxProps): JSX.Element => {
  const { children, ...restProps } = props;
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
      {...restProps}
    >
      {children}
    </Box>
  );
};

const LayoutContent = (props: BoxProps): JSX.Element => {
  const { children, ...restProps } = props;
  const { asideWidth, asideCollapsedWidth, headerHeight } = useLayoutState();

  return (
    <Box
      display={'flex'}
      as={'main'}
      minHeight={`calc(100vh - ${headerHeight} )`}
      marginTop={headerHeight}
      marginStart={[0, 0, 0, asideCollapsedWidth, asideWidth]}
      {...restProps}
    >
      {children}
    </Box>
  );
};

const LayoutRoot = (props: BoxProps) => {
  const { children, ...restProps } = props;
  const { backgroundColor } = useLayoutState();
  return (
    <Box backgroundColor={backgroundColor} display="block" {...restProps}>
      {children}
    </Box>
  );
};

type LayoutProp = LayoutState;

const Layout = ({ children, ...layoutProps }: PropsWithChildren<LayoutProp>): JSX.Element => {
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
