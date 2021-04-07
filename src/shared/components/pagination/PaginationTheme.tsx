import { extendTheme } from '@chakra-ui/react';

const components = {
  Pagination: {
    baseStyle: ({ colorMode }) => ({
      bg: colorMode === 'dark' ? 'green.300' : 'green.500',
      color: colorMode === 'dark' ? 'gray.800' : 'white',
      textTransform: 'uppercase',
      fontWeight: 'semibold',
      letterSpacing: '0.02em',
      padding: '4px',
      borderRadius: '2px',
      fontSize: '12px',
    }),
  },
};

const theme = extendTheme({ components });
