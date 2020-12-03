module.exports = (appProduction) => {
  return {
    name: 'admin',
    title: 'Agile 管理后台',
    publicPath: '/admin',
    serverHost: 'www.agile.test',
    serverPort: 8010,
    pwaEnable: true,
    apiHost: appProduction ? 'https://agile.huijiewei.com/admin-api' : 'https://agile.huijiewei.com/admin-api',
    htmlChunks: ['react', 'vendor', 'shared', 'evergreen', 'admin'],
  };
};
