import { Styles } from '@chakra-ui/theme-tools';

const styles: Styles = {
  global: {
    body: {
      fontSize: 'md',
      overflowX: 'scroll',
      '&::-webkit-scrollbar': {
        width: '7px',
      },
      '&::-webkit-scrollbar-track': {
        width: '9px',
      },
      '&::-webkit-scrollbar-thumb': {
        background: 'gray.400',
        borderRadius: 'sm',
      },
    },
    'a[disabled]': {
      pointerEvents: 'none',
    },
  },
};

export { styles };
