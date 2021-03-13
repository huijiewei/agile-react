module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        bugfixes: true,
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'automatic',
        development: process.env.NODE_ENV === 'development',
        importSource: '@welldone-software/why-did-you-render',
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: ['@babel/plugin-transform-runtime'],
};
