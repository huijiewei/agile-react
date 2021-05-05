module.exports = (isProduction) => {
  return {
    name: 'mobile',
    title: 'Agile 移动端',
    publicPath: '/mobile',
    serverHost: 'localhost',
    serverPort: 8020,
    pwaEnable: true,
    apiHost: isProduction ? 'https://agile.huijiewei.com/admin-api' : 'https://agile.huijiewei.com/admin-api',
    qsArrayFormat: 'none',
  };
};
