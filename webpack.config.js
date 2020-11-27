const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackPwaManifest = require('webpack-pwa-manifest');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
  const appProduction = argv.mode === 'production';
  const appConfig = require(env.APP_CONFIG)(appProduction);

  const fileName = `assets/js/${appProduction ? '[name].[contenthash:8].js' : '[name].js'}`;
  const cssFileName = `assets/css/${appProduction ? '[name].[contenthash:8].js' : '[name].js'}`;

  const config = {
    mode: argv.mode,
    entry: appConfig.entry,
    target: appProduction ? 'browserslist' : 'web',
    resolve: {
      extensions: ['.tsx', '.ts', 'jsx', '.js'],
      alias: Object.assign(
        {
          '@shared': path.resolve('src/shared'),
        },
        appConfig.alias,
      ),
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: path.resolve('./src'),
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [appProduction ? MiniCssExtractPlugin.loader : 'style-loader', 'css-loader'],
        },
        {
          test: /\.(png|jpe?g|gif|webp)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 8192,
                name: 'assets/images/[name].[hash:8].[ext]',
              },
            },
          ],
        },
        {
          test: /\.(woff2?|eot|ttf|otf)$/,
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 16384,
                name: 'assets/fonts/[name].[hash:8].[ext]',
              },
            },
          ],
        },
      ],
    },
    output: {
      path: path.resolve(`./dist${appConfig.publicPath}`),
      publicPath: appConfig.publicPath + '/',
      filename: fileName,
      chunkFilename: fileName,
      pathinfo: false,
    },
    devServer: {
      contentBase: [path.resolve('public/shared/'), path.resolve('public/app' + appConfig.publicPath)],
      contentBasePublicPath: appConfig.publicPath,
      historyApiFallback: {
        index: appConfig.publicPath,
      },
      headers: { 'Access-Control-Allow-Origin': '*' },
      publicPath: appConfig.publicPath,
      host: appConfig.serverHost,
      port: appConfig.serverPort,
      public: `${appConfig.serverHost}:${appConfig.serverPort}${appConfig.publicPath}`,
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        BASE_URL: appConfig.publicPath,
      }),
      new HtmlWebPackPlugin({
        title: appConfig.name,
        template: path.join('./public/app', appConfig.publicPath, 'index.html'),
        templateParameters: {
          BASE_URL: appConfig.publicPath + '/',
          API_HOST: appConfig.apiHost,
        },
        inject: true,
        filename: 'index.html',
        chunks: appConfig.chunks,
      }),
    ],
  };

  if (appProduction) {
    config.optimization = {
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendor',
            chunks: 'initial',
            priority: 10,
            enforce: true,
          },
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom|react-router-dom)[\\/]/,
            chunks: 'initial',
            priority: 20,
            enforce: true,
          },
          shared: {
            test: /[\\/]src\/shared[\\/]/,
            name: 'shared',
            chunks: 'initial',
            priority: 5,
            enforce: true,
          },
          styles: {
            name: 'styles',
            test: /\.css$/,
            chunks: 'initial',
            enforce: true,
          },
        },
      },
    };

    //config.plugins.push(new BundleAnalyzerPlugin());
    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    );
    config.plugins.push(
      new MiniCssExtractPlugin({
        filename: cssFileName,
        chunkFilename: cssFileName,
      }),
    );
    config.plugins.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve('dist' + appConfig.publicPath)],
      }),
    );
    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: 'public/shared',
            to: './',
            toType: 'dir',
            globOptions: {
              ignore: ['.DS_Store'],
            },
          },
        ],
      }),
    );
  } else {
    config.optimization = {
      runtimeChunk: true,
    };
    config.devtool = 'eval-cheap-module-source-map';
  }

  return config;
};
