import { extendTheme } from '@chakra-ui/react';
import { alertTheme } from '@shared/theme/components/alert';
import { linkTheme } from '@shared/theme/components/link';
import { breadcrumbTheme } from '@shared/theme/components/breadcrumb';
import { tableTheme } from '@shared/theme/components/table';
import { buttonTheme, closeButtonTheme } from '@shared/theme/components/button';
import { modalTheme } from '@shared/theme/components/modal';
import { formErrorTheme, formHorizontalLabelTheme } from '@shared/theme/components/form';
import { inputTheme, numberInputTheme } from '@shared/theme/components/input';
import { breakpoints } from '@shared/theme/foundations/breakpoints';
import { typography } from '@shared/theme/foundations/typography';
import { sizes, spacing } from '@shared/theme/foundations/sizes';
import { radii } from '@shared/theme/foundations/radius';
import { selectTheme } from '@shared/theme/components/select';
import { styles } from '@shared/theme/styles';
import { menuTheme } from '@shared/theme/components/menu';
import { skeletonTheme } from '@shared/theme/components/skeleton';
import { tabsTheme } from '@shared/theme/components/tabs';

const agileTheme = extendTheme({
  config: {
    cssVarPrefix: 'ag',
  },
  styles: styles,
  breakpoints: breakpoints,
  ...typography,
  radii: radii,
  space: spacing,
  sizes: sizes,
  components: {
    Alert: alertTheme,
    Link: linkTheme,
    Breadcrumb: breadcrumbTheme,
    Button: buttonTheme,
    Modal: modalTheme,
    Menu: menuTheme,
    FormError: formErrorTheme,
    FormHorizontalLabel: formHorizontalLabelTheme,
    Input: inputTheme,
    NumberInput: numberInputTheme,
    Table: tableTheme,
    Select: selectTheme,
    CloseButton: closeButtonTheme,
    Skeleton: skeletonTheme,
    Tabs: tabsTheme,
  },
});

export { agileTheme };
