import { style, styleVariants } from '@vanilla-extract/css';
import { themeVars } from '@uikit/themes/vanilla.css';

const buttonClassName = style({
  fontFamily: 'inherit',
  fontWeight: (themeVars.fontWeights.medium as unknown) as number,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderRadius: themeVars.radii.default,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  userSelect: 'none',
  cursor: 'pointer',
  transition: 'all 250ms',
  ':focus': {},
});

const buttonSizeClassName = styleVariants({
  lg: {
    height: '40px',
    minWidth: '40px',
    padding: '0 12px',
  },
  md: {
    height: '32px',
    minWidth: '32px',
    padding: '0 10px',
    lineHeight: themeVars.lineHeights.small,
  },
  sm: {
    height: '26px',
    minWidth: '26px',
    padding: '0 6px',
  },
  xs: {
    height: '22px',
    minWidth: '22px',
    padding: '0 5px',
    fontSize: themeVars.fontSizes.small,
  },
});

const buttonVariantClassName = styleVariants({
  solid: {
    backgroundColor: themeVars.colors.blue50,
    borderColor: themeVars.colors.blue50,
    color: themeVars.colors.white,
    ':hover': {
      backgroundColor: themeVars.colors.blue60,
      borderColor: themeVars.colors.blue60,
    },
    ':active': {
      backgroundColor: themeVars.colors.blue70,
      borderColor: themeVars.colors.blue70,
    },
  },
  outline: {
    backgroundColor: 'transparent',
    borderColor: 'currentcolor',
    color: themeVars.colors.blue50,
    ':hover': {
      backgroundColor: themeVars.colors.blue05,
    },
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    color: themeVars.colors.blue50,
    ':hover': {
      backgroundColor: themeVars.colors.blue05,
    },
  },
  link: {
    borderColor: 'transparent',
  },
});

export { buttonClassName, buttonSizeClassName, buttonVariantClassName };
