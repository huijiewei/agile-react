import { createCss } from '@stitches/react';

const stitchesConfig = createCss({
  theme: {
    colors: {
      white: '#fff',
      black: '#1b1f23',

      gray0: '#fafbfc',
      gray1: '#f6f8fa',
      gray2: '#e1e4e8',
      gray3: '#d1d5da',
      gray4: '#959da5',
      gray5: '#6a737d',
      gray6: '#586069',
      gray7: '#444d56',
      gray8: '#2f363d',
      gray9: '#24292e',

      blue0: '#EBF8FF',
      blue1: '#BEE3F8',
      blue2: '#90CDF4',
      blue3: '#63B3ED',
      blue4: '#4299E1',
      blue5: '#3182CE',
      blue6: '#2B6CB0',
      blue7: '#2C5282',
      blue8: '#2A4365',
      blue9: '#1A365D',

      green0: '#f0fff4',
      green1: '#dcffe4',
      green2: '#bef5cb',
      green3: '#85e89d',
      green4: '#34d058',
      green5: '#28a745',
      green6: '#22863a',
      green7: '#176f2c',
      green8: '#165c26',
      green9: '#144620',

      yellow0: '#fffdef',
      yellow1: '#fffbdd',
      yellow2: '#fff5b1',
      yellow3: '#ffea7f',
      yellow4: '#ffdf5d',
      yellow5: '#ffd33d',
      yellow6: '#f9c513',
      yellow7: '#dbab09',
      yellow8: '#b08800',
      yellow9: '#735c0f',

      orange0: '#fff8f2',
      orange1: '#ffebda',
      orange2: '#ffd1ac',
      orange3: '#ffab70',
      orange4: '#fb8532',
      orange5: '#f66a0a',
      orange6: '#e36209',
      orange7: '#d15704',
      orange8: '#c24e00',
      orange9: '#a04100',

      red0: '#ffeef0',
      red1: '#ffdce0',
      red2: '#fdaeb7',
      red3: '#f97583',
      red4: '#ea4a5a',
      red5: '#d73a49',
      red6: '#cb2431',
      red7: '#b31d28',
      red8: '#9e1c23',
      red9: '#86181d',

      purple0: '#f5f0ff',
      purple1: '#e6dcfd',
      purple2: '#d1bcf9',
      purple3: '#b392f0',
      purple4: '#8a63d2',
      purple5: '#6f42c1',
      purple6: '#5a32a3',
      purple7: '#4c2889',
      purple8: '#3a1d6e',
      purple9: '#29134e',

      pink0: '#ffeef8',
      pink1: '#fedbf0',
      pink2: '#f9b3dd',
      pink3: '#f692ce',
      pink4: '#ec6cb9',
      pink5: '#ea4aaa',
      pink6: '#d03592',
      pink7: '#b93a86',
      pink8: '#99306f',
      pink9: '#6d224f',
    },
    fonts: {
      body:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
      mono: 'SFMono-Regular, Consolas, "Liberation Mono", Menlo, Courier, monospace',
    },
    fontSizes: {
      sm: '12px',
      base: '14px',
      lg: '16px',
      xl: '20px',
    },
    fontWeights: {
      light: 300,
      normal: 400,
      semibold: 500,
      bold: 600,
    },
    lineHeights: {
      none: 1,
      tight: 1.2,
      normal: 1.5715,
    },
    radii: {
      sm: '1px',
      base: '2px',
      lg: '3px',
      xl: '5px',
      full: '9999px',
    },
  },
});

export const { styled, theme, keyframes, global } = stitchesConfig;

export const globalStyles = global({
  '*, *::before, *::after': {
    boxSizing: 'border-box',
  },
  '::-webkit-file-upload-button': {
    WebkitAppearance: 'button',
    font: 'inherit',
  },
  '::-webkit-search-decoration': {
    WebkitAppearance: 'none',
  },
  '::-moz-focus-inner': {
    borderStyle: 'none',
    padding: 0,
  },
  '::-webkit-inner-spin-button, ::-webkit-outer-spin-button': {
    height: 'auto',
  },
  ':root': {
    MozTabSize: 4,
    tabSize: 4,
  },
  ':-moz-forcusring': {
    outline: '1px dotted ButtonText',
  },
  ':-moz-ui-invalid': {
    boxShadow: 'none',
  },
  html: {
    lineHeight: 1.15,
    WebkitTextSizeAdjust: '100%',
  },
  body: {
    margin: 0,
    fontSize: '$base',
    fontFamily: '$body',
  },
  hr: {
    height: 0,
    color: 'inherit',
  },
  'abbr[title]': {
    textDecoration: 'underline dotted',
  },
  'b,strong': {
    fontWeight: '$bold',
  },
  'code,kbd,samp,pre': {
    fontFamily: '$mono',
    fontSize: '1em',
  },
  small: {
    fontSize: '$sm',
  },
  'sub, sup': {
    fontSize: '$sm',
  },
  sub: {
    bottom: '-0.25em',
  },
  sup: {
    top: '-0.25em',
  },
  table: {
    textIndent: 0,
    borderColor: 'inherit',
  },
  'button, input, optgroup, select, textarea': {
    margin: 0,
    fontSize: '100%',
    fontFamily: 'inherit',
    lineHeight: 1.15,
  },
  'button, select': {
    textTransform: 'none',
  },
  'button, [type="button"], [type="reset"], [type="submit"]': {
    WebkitAppearance: 'button',
  },
  legend: {
    padding: 0,
  },
  progress: {
    verticalAlign: 'baseline',
  },
  '[type="search"]': {
    WebkitAppearance: 'textfield',
    outlineOffset: '-2px',
  },
  summary: {
    display: 'list-item',
  },
});
