import { createGlobalTheme, globalStyle } from '@vanilla-extract/css';
import './reset.css';

const colorGray = {
  gray05: '#fafbfc',
  gray10: '#f6f8fa',
  gray20: '#e1e4e8',
  gray30: '#d1d5da',
  gray40: '#959da5',
  gray50: '#6a737d',
  gray60: '#586069',
  gray70: '#444d56',
  gray80: '#2f363d',
  gray90: '#24292e',
};

const colorBlue = {
  blue05: '#EBF8FF',
  blue10: '#BEE3F8',
  blue20: '#90CDF4',
  blue30: '#63B3ED',
  blue40: '#4299E1',
  blue50: '#3182CE',
  blue60: '#2B6CB0',
  blue70: '#2C5282',
  blue80: '#2A4365',
  blue90: '#1A365D',
};

const colorGreen = {
  green05: '#f0fff4',
  green10: '#dcffe4',
  green20: '#bef5cb',
  green30: '#85e89d',
  green40: '#34d058',
  green50: '#28a745',
  green60: '#22863a',
  green70: '#176f2c',
  green80: '#165c26',
  green90: '#144620',
};

const colorYellow = {
  yellow05: '#fffdef',
  yellow10: '#fffbdd',
  yellow20: '#fff5b1',
  yellow30: '#ffea7f',
  yellow40: '#ffdf5d',
  yellow50: '#ffd33d',
  yellow60: '#f9c513',
  yellow70: '#dbab09',
  yellow80: '#b08800',
  yellow90: '#735c0f',
};

const colorOrange = {
  orange05: '#fff8f2',
  orange10: '#ffebda',
  orange20: '#ffd1ac',
  orange30: '#ffab70',
  orange40: '#fb8532',
  orange50: '#f66a0a',
  orange60: '#e36209',
  orange70: '#d15704',
  orange80: '#c24e00',
  orange90: '#a04100',
};

const colorRed = {
  red05: '#ffeef0',
  red10: '#ffdce0',
  red20: '#fdaeb7',
  red30: '#f97583',
  red40: '#ea4a5a',
  red50: '#d73a49',
  red60: '#cb2431',
  red70: '#b31d28',
  red80: '#9e1c23',
  red90: '#86181d',
};

const colorPurple = {
  purple05: '#f5f0ff',
  purple10: '#e6dcfd',
  purple20: '#d1bcf9',
  purple30: '#b392f0',
  purple40: '#8a63d2',
  purple50: '#6f42c1',
  purple60: '#5a32a3',
  purple70: '#4c2889',
  purple80: '#3a1d6e',
  purple90: '#29134e',
};

const colorPink = {
  pink05: '#ffeef8',
  pink10: '#fedbf0',
  pink20: '#f9b3dd',
  pink30: '#f692ce',
  pink40: '#ec6cb9',
  pink50: '#ea4aaa',
  pink60: '#d03592',
  pink70: '#b93a86',
  pink80: '#99306f',
  pink90: '#6d224f',
};

const colors = {
  white: '#fff',
  black: '#000',

  ...colorGray,
  ...colorBlue,
  ...colorGreen,
  ...colorYellow,
  ...colorOrange,
  ...colorRed,
  ...colorPurple,
  ...colorPink,
};

const themeVars = createGlobalTheme(':root', {
  colors: colors,
  fonts: {
    body:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
    mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
  },
  fontSizes: {
    micro: '0.75rem',
    small: '0.75rem',
    default: '0.875rem',
    large: '1rem',
  },
  fontWeights: {
    light: '300',
    regular: '400',
    medium: '500',
    strong: '600',
  },
  lineHeights: {
    micro: '.75',
    small: '.75',
    default: '.875',
    large: '1.125',
  },
  radii: {
    none: '0',
    micro: '1px',
    small: '1px',
    default: '2px',
    lg: '3px',
    xl: '5px',
    full: '9999px',
  },
  breakpoint: {
    mobile: '0',
    tablet: '768',
    desktop: '1136',
  },
});

globalStyle('body', {
  fontSize: themeVars.fontSizes.default,
  fontFamily: themeVars.fonts.body,
});

globalStyle('a[disabled]', {
  pointerEvents: 'none',
});

export { themeVars };
