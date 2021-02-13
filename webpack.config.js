const path = require('path');
const { EnvironmentPlugin } = require('webpack');

const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = (env, argv) => {
  process.env.NODE_ENV = argv.mode;

  const appProduction = argv.mode === 'production';
  const appConfig = require(env['APP_CONFIG'])(appProduction);

  const appName = appConfig.name;

  const fileName = `assets/js/${appProduction ? '[name].[contenthash:8].js' : '[name].js'}`;
  const cssFileName = `assets/css/${appProduction ? '[name].[contenthash:8].css' : '[name].css'}`;

  const config = {
    entry: {
      [appName]: `./src/app/${appName}/entry.tsx`,
    },
    resolve: {
      extensions: ['.jsx', '.js', '.tsx', '.ts'],
      alias: {
        ...{
          '@shared': path.resolve('src/shared'),
        },
        ...{
          [`@${appName}`]: path.resolve(`src/app/${appName}`),
        },
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
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: [
            appProduction ? MiniCssExtractPlugin.loader : 'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            'postcss-loader',
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
              maxSize: 4 * 1024, // 4kb
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
              maxSize: 2 * 1024, // 4kb
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
      public: `${appConfig.serverHost}:${appConfig.serverPort}${appConfig.publicPath}`,
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
        chunks: appConfig.htmlChunks,
      }),
    ],
  };

  if (appProduction) {
    config.optimization = {
      minimizer: ['...', new CssMinimizerPlugin()],
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
            test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
            chunks: 'initial',
            priority: 20,
            enforce: true,
          },
          chakra: {
            name: 'chakra',
            test: /[\\/]node_modules[\\/](@chakra-ui)[\\/]/,
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
    config.plugins.push(new CleanWebpackPlugin());
  } else {
    config.optimization = {
      runtimeChunk: true,
    };
    config.devtool = 'eval-cheap-module-source-map';
  }

  return config;
};
