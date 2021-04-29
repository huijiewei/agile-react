import { getColor, mode, transparentize } from '@chakra-ui/theme-tools';
import { Dict } from '@shared/utils/types';

const alertTheme = {
  baseStyle: {
    icon: { height: 6, width: 4 },
  },
  variants: {
    subtle: (props: Dict): Dict => ({
      container: {
        bg: mode(
          getColor(props.theme, `${props.colorScheme}.50`, props.colorScheme),
          transparentize(`${props.colorScheme}.100`, 0.16)(props.theme)
        )(props),
      },
    }),
  },
};

export { alertTheme };
