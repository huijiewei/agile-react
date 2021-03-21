module.exports = (api) => {
  api.cache.using(() => process.env.NODE_ENV);

  return {
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
          development: !api.env('production'),
          importSource: '@welldone-software/why-did-you-render',
        },
      ],
      '@babel/preset-typescript',
    ],
    plugins: ['@babel/plugin-transform-runtime', !api.env('production') && 'react-refresh/babel'].filter(Boolean),
  };
};
