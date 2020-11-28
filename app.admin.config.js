const { resolve } = require('path');

module.exports = (appProduction) => {
  return {
    publicPath: '/admin',
    serverHost: 'www.agile.test',
    serverPort: 8010,
    name: 'admin',
    title: 'Agile 管理后台',
    pwa: {
      icons: [],
    },
    pwaEnable: true,
    apiHost: appProduction ? 'https://agile.huijiewei.com/admin-api' : 'https://agile.huijiewei.com/admin-api',
    htmlChunks: ['react', 'vendor', 'shared', 'admin'],
  };
};
