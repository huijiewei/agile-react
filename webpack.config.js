const path = require('path');
const { EnvironmentPlugin } = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports = (env, argv) => {
  process.env.NODE_ENV = argv.mode;

  const isProduction = argv.mode === 'production';
  const appConfig = require(env['APP_CONFIG'])(isProduction);

  const appName = appConfig.name;

  const fileName = `assets/js/${isProduction ? '[name].[contenthash:8].js' : '[name].js'}`;
  const cssFileName = `assets/css/${isProduction ? '[name].[contenthash:8].css' : '[name].css'}`;

  const config = {
    entry: {
      [appName]: `./src/app/${appName}/index.tsx`,
    },
    resolve: {
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
      assetModuleFilename: 'assets/resource/[name].[hash:8][ext]',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx|ts|tsx)$/,
          include: path.resolve('./src'),
          use: [{ loader: 'babel-loader' }].filter(Boolean),
        },
        {
          test: /\.css$/,
          use: [
            isProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                modules: false,
              },
            },
          ],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset',
          generator: {
            filename: 'assets/images/[name].[hash:8][ext]',
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
            filename: 'assets/medias/[name].[hash:8][ext]',
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset',
          generator: {
            filename: 'assets/fonts/[name].[hash:8][ext]',
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
      dev: {
        publicPath: appConfig.publicPath,
      },
      host: appConfig.serverHost,
      port: appConfig.serverPort,
    },
    plugins: [
      new EnvironmentPlugin({
        PUBLIC_URL: appConfig.publicPath,
        QS_ARRAY_FORMAT: appConfig.qsArrayFormat,
      }),
      new ESLintPlugin(),
      new MiniCssExtractPlugin({
        filename: cssFileName,
        chunkFilename: cssFileName,
      }),
      new HtmlWebPackPlugin({
        title: appConfig.title,
        template: `./public/app/${appName}/index.html`,
        templateParameters: {
          PUBLIC_URL: appConfig.publicPath + '/',
          API_HOST: appConfig.apiHost,
        },
        inject: true,
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
      !isProduction && new ReactRefreshWebpackPlugin(),
      isProduction && new CleanWebpackPlugin(),
      isProduction &&
        env['BUNDLE_ANALYZE'] === '1' &&
        new BundleAnalyzerPlugin({
          analyzerMode: 'static',
        }),
    ].filter(Boolean),
  };

  if (isProduction) {
    config.optimization = {
      minimizer: ['...', new CssMinimizerPlugin()],
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
            priority: 20,
            enforce: true,
          },
          shared: {
            name: 'shared',
            test: /[\\/]src\/shared[\\/]/,
            chunks: 'all',
            priority: 15,
            enforce: true,
          },
          default: {
            name: 'components',
            chunks: 'all',
            minChunks: 2,
            priority: 10,
          },
        },
      },
    };
  } else {
    config.optimization = {
      runtimeChunk: true,
    };

    config.devtool = 'eval-cheap-source-map';
  }

  return config;
};
