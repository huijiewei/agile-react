import { style } from '@vanilla-extract/css';
import { themeVars } from '@uikit/themes/vanilla.css';

const buttonClassName = style({
  lineHeight: themeVars.lineHeights.normal,
  backgroundColor: themeVars.colors.blue6,
  borderRadius: themeVars.radii.md,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  userSelect: 'none',
});

export { buttonClassName };
