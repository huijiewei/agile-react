const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default;
const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/**/*.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      tablet: '640px',
      laptop: '1024px',
      desktop: '1280px',
    },
    fontSize: {
      xs: ['0.5rem', '1rem'],
      sm: ['0.75rem', '1rem'],
      base: ['0.875rem', '1.25rem'],
      lg: ['1rem', '1.5rem'],
      xl: ['1.125rem', '1.75rem'],
    },
    spacing: {
      px: '1px',
      0: '0px',
      0.5: '0.125rem',
      1: '0.25rem',
      1.5: '0.375rem',
      2: '0.5rem',
      2.5: '0.625rem',
      3: '0.75rem',
      4: '0.875rem',
      5: '1rem',
      6: '1.25rem',
      7: '1.5rem',
      8: '1.75rem',
      9: '2rem',
      10: '2.25rem',
      11: '2.5rem',
      12: '2.75rem',
      14: '3.25rem',
      16: '3.75rem',
      20: '4.75rem',
      24: '5.75rem',
      28: '7rem',
      32: '8rem',
      36: '9rem',
      40: '10rem',
      44: '11rem',
      48: '12rem',
      52: '13rem',
      56: '14rem',
      60: '15rem',
      64: '16rem',
      72: '18rem',
      80: '20rem',
      96: '24rem',
    },
    extend: {},
  },
  variants: {
    extend: {
      backgroundColor: ['active'],
      borderRadius: ['first', 'last'],
      borderColor: ['odd', 'even', 'first', 'last'],
      margin: ['first', 'last'],
    },
  },
  corePlugins: {
    gradientColorStops: false,
  },
  plugins: [
    ({ addUtilities, theme, variants }) => {
      let colors = flattenColorPalette(theme('borderColor'));
      delete colors['default'];

      if (this.theme?.extend?.colors !== undefined) {
        colors = Object.assign(colors, this.theme.extend.colors);
      }

      const colorMap = Object.keys(colors).map((color) => ({
        [`.border-t-${color}`]: { borderTopColor: colors[color] },
        [`.border-r-${color}`]: { borderRightColor: colors[color] },
        [`.border-b-${color}`]: { borderBottomColor: colors[color] },
        [`.border-l-${color}`]: { borderLeftColor: colors[color] },
      }));

      const utilities = Object.assign({}, ...colorMap);

      addUtilities(utilities, variants('borderColor'));
    },
  ],
};
