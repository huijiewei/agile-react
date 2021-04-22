module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          bugfixes: true,
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
          development: !api.env('production'),
          importSource: '@welldone-software/why-did-you-render',
        },
      ],
      ['@babel/preset-typescript', { allowDeclareFields: true }],
    ],
    plugins: [
      '@babel/plugin-transform-runtime',
      !api.env('production') && 'react-refresh/babel',
      '@vanilla-extract/babel-plugin',
    ].filter(Boolean),
  };
};
