module.exports = (isProduction) => {
  return {
    name: 'admin',
    title: 'Agile 管理后台',
    publicPath: '/admin',
    serverHost: 'localhost',
    serverPort: 8010,
    pwaEnable: true,
    apiHost: isProduction ? 'https://agile.huijiewei.com/admin-api' : 'https://agile.huijiewei.com/admin-api',
    qsArrayFormat: 'none',
  };
};
