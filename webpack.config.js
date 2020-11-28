const path = require('path');
const webpack = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');

module.exports = (env, argv) => {
  const appProduction = argv.mode === 'production';
  const appConfig = require(env.APP_CONFIG)(appProduction);

  const appName = appConfig.name;

  const fileName = `assets/js/${appProduction ? '[name].[contenthash:8].js' : '[name].js'}`;
  const cssFileName = `assets/css/${appProduction ? '[name].[contenthash:8].css' : '[name].css'}`;

  const config = {
    entry: {
      [appName]: `./src/app/${appName}/index.tsx`,
    },
    resolve: {
      extensions: ['.tsx', '.ts', 'jsx', '.js'],
      alias: Object.assign(
        {
          '@shared': path.resolve('src/shared'),
        },
        {
          [`@${appName}`]: path.resolve(`src/app/${appName}`),
        },
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
          test: /\.less$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'],
        },
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
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
      path: path.resolve(`./dist/${appName}`),
      publicPath: appConfig.publicPath + '/',
      filename: fileName,
      chunkFilename: fileName,
      pathinfo: false,
    },
    devServer: {
      static: [
        {
          directory: path.resolve('public/shared/'),
          publicPath: appConfig.publicPath,
        },
        {
          directory: path.resolve(`public/app/${appName}/`),
          publicPath: appConfig.publicPath,
        },
      ],
      historyApiFallback: {
        index: appConfig.publicPath,
      },
      headers: { 'Access-Control-Allow-Origin': '*' },
      dev: {
        publicPath: appConfig.publicPath,
      },
      host: appConfig.serverHost,
      port: appConfig.serverPort,
      public: `${appConfig.serverHost}:${appConfig.serverPort}${appConfig.publicPath}`,
    },
    plugins: [
      new webpack.EnvironmentPlugin({
        BASE_URL: appConfig.publicPath,
      }),
      new MiniCssExtractPlugin({
        filename: cssFileName,
        chunkFilename: cssFileName,
      }),
      new HtmlWebPackPlugin({
        title: appConfig.title,
        template: `./public/app/${appName}/index.html`,
        templateParameters: {
          BASE_URL: appConfig.publicPath + '/',
          API_HOST: appConfig.apiHost,
        },
        inject: true,
        filename: 'index.html',
        chunks: appConfig.htmlChunks,
      }),
    ],
  };

  if (appProduction) {
    config.optimization = {
      minimizer: [new CssMinimizerPlugin()],
      splitChunks: {
        cacheGroups: {
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'initial',
            priority: 10,
            enforce: true,
          },
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom)[\\/]/,
            chunks: 'initial',
            priority: 20,
            enforce: true,
          },
          shared: {
            name: 'shared',
            test: /[\\/]src\/shared[\\/]/,
            chunks: 'initial',
            priority: 5,
            enforce: true,
          },
        },
      },
    };

    config.plugins.push(
      new WorkboxPlugin.GenerateSW({
        clientsClaim: true,
        skipWaiting: true,
      }),
    );
    config.plugins.push(
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [path.resolve(`./dist/${appName}/`)],
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
