module.exports = (appProduction) => {
  return {
    name: 'mobile',
    title: 'Agile 移动端',
    publicPath: '/mobile',
    serverHost: 'www.agile.test',
    serverPort: 8020,
    pwaEnable: true,
    apiHost: appProduction ? 'https://agile.huijiewei.com/admin-api' : 'https://agile.huijiewei.com/admin-api',
    qsArrayFormat: 'none',
    htmlChunks: ['react', 'vendor', 'shared', 'mobile'],
  };
};
