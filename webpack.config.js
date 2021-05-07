const path = require('path');
const { EnvironmentPlugin } = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, argv) => {
  process.env.NODE_ENV = argv.mode;

  const isProduction = argv.mode === 'production';
  const appConfig = require(env['APP_CONFIG'])(isProduction);

  const appName = appConfig.name;

  const fileName = `assets/js/${isProduction ? '[name].[contenthash:8].js' : '[name].js'}`;
  const cssFileName = `assets/css/${isProduction ? '[name].[contenthash:8].css' : '[name].css'}`;
  const assetsFileName = isProduction ? '[contenthash:8][ext]' : '[name][ext]';

  const config = {
    entry: {
      [appName]: `./src/app/${appName}`,
    },
    watchOptions: {
      ignored: /node_modules/,
    },
    cache: {
      type: 'filesystem',
    },
    resolve: {
      modules: [path.resolve(__dirname, './node_modules')],
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
      alias: {
        '@shared': path.resolve('src/shared'),
        [`@${appName}`]: path.resolve(`src/app/${appName}`),
      },
    },
    output: {
      path: path.resolve(`./dist/${appName}`),
      publicPath: appConfig.publicPath + '/',
      filename: fileName,
      chunkFilename: fileName,
      pathinfo: false,
      assetModuleFilename: `assets/resource/${assetsFileName}`,
      clean: isProduction,
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: path.resolve(__dirname, './src'),
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            {
              loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
              options: { importLoaders: 1 },
            },
            {
              loader: 'postcss-loader',
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          generator: {
            filename: `assets/images/${assetsFileName}`,
          },
          parser: {
            dataUrlCondition: {
              maxSize: 256,
            },
          },
        },
        {
          test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
          type: 'asset/resource',
          generator: {
            filename: `assets/medias/${assetsFileName}`,
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset',
          generator: {
            filename: `assets/fonts/${assetsFileName}`,
          },
          parser: {
            dataUrlCondition: {
              maxSize: 256,
            },
          },
        },
      ],
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
      devMiddleware: {
        publicPath: appConfig.publicPath,
      },
      open: appConfig.publicPath,
      host: appConfig.serverHost,
      port: appConfig.serverPort,
    },
    plugins: [
      new EnvironmentPlugin({
        PUBLIC_URL: appConfig.publicPath,
        QS_ARRAY_FORMAT: appConfig.qsArrayFormat,
      }),
      isProduction && new ESLintPlugin(),
      isProduction &&
        new ForkTsCheckerWebpackPlugin({
          eslint: {
            files: [`./src/app/${appName}/**/*.{ts,tsx,js,jsx}`],
          },
        }),
      isProduction &&
        new MiniCssExtractPlugin({
          filename: cssFileName,
          chunkFilename: cssFileName,
        }),
      !isProduction &&
        new ReactRefreshWebpackPlugin({
          overlay: {
            sockProtocol: 'ws',
          },
        }),
      new HtmlWebPackPlugin({
        title: appConfig.title,
        template: `./public/app/${appName}/index.html`,
        templateParameters: {
          PUBLIC_URL: appConfig.publicPath + '/',
          API_HOST: appConfig.apiHost,
        },
        minify: isProduction
          ? {
              collapseWhitespace: true,
              keepClosingSlash: true,
              removeComments: true,
              removeRedundantAttributes: true,
              removeScriptTypeAttributes: true,
              removeStyleLinkTypeAttributes: true,
              useShortDoctype: true,
              minifyCSS: true,
            }
          : false,
        filename: 'index.html',
      }),
      isProduction &&
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
      isProduction &&
        env['BUNDLE_ANALYZE'] === '1' &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
        }),
    ].filter(Boolean),
  };

  if (isProduction) {
    config.optimization = {
      minimizer: [new CssMinimizerPlugin(), '...'],
      splitChunks: {
        cacheGroups: {
          react: {
            name: 'react',
            test: /[\\/]node_modules[\\/](react|react-dom|react-router|react-router-dom|history)[\\/]/,
            chunks: 'all',
            priority: 30,
            enforce: true,
          },
          chakra: {
            name: 'chakra',
            test: /[\\/]node_modules[\\/](@chakra-ui|framer-motion)[\\/]/,
            chunks: 'all',
            priority: 25,
            enforce: true,
          },
          vendor: {
            name: 'vendor',
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            priority: 10,
            enforce: true,
          },
          shared: {
            name: 'shared',
            test: /[\\/]src\/shared[\\/]/,
            chunks: 'all',
            priority: 20,
            enforce: true,
          },
          default: {
            name: 'components',
            chunks: 'all',
            minChunks: 2,
            priority: 10,
            reuseExistingChunk: true,
          },
        },
      },
    };
  } else {
    config.optimization = {
      runtimeChunk: 'single',
    };

    config.devtool = 'eval-cheap-source-map';
  }

  return config;
};
