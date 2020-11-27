const { resolve } = require('path');

module.exports = (appProduction) => {
  return {
    publicPath: '/admin',
    serverHost: 'www.agile.test',
    serverPort: 8010,
    name: 'Agile 管理后台',
    entry: {
      admin: './src/app/admin/index.tsx',
    },
    alias: {
      '@admin': resolve('src/app/admin'),
    },
    pwa: {
      icons: [],
    },
    chunks: ['react', 'vendor', 'agile', 'admin'],
    pwaEnable: true,
    apiHost: appProduction ? 'https://agile.huijiewei.com/admin-api' : 'https://agile.huijiewei.com/admin-api',
  };
};
