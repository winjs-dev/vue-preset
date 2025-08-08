const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const pkg = require('../../package');
const webpack = require('webpack');
const path = require('path');
const fse = require('fs-extra');
const utils = require('./utils');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const resolve = utils.resolve;
const childName = process.env.npm_config_child || pkg.name;
let entries = {};
let aliasMap = {
  vue$: 'vue/dist/vue.esm.js',
  '@': resolve('src'),
  '@assets': resolve('src/assets'),
  '@style': resolve('src/assets/style'),
  '@js': resolve('src/assets/js'),
  '@components': resolve('src/components'),
  '@mixins': resolve('src/mixins'),
  '@filters': resolve('src/filters'),
  '@store': resolve('src/store'),
  '@views': resolve('src/views'),

  // 文件别名
  services: resolve('src/services'),
  variable: resolve('src/assets/style/variable.less'),
  utils: resolve('node_modules/@winner-fed/cloud-utils/dist/cloud-utils.esm'),
  mixins: resolve('node_modules/@winner-fed/magicless/magicless.less')
};

// 复制文件
let copyPlugin = [];

entries[childName + '/' + childName] = './src/index.pro.js';

let staticExits = fse.pathExistsSync(resolve('src/static'));

if (staticExits) {
  copyPlugin.push({
    from: resolve('src/static'),
    to: resolve('dist/' + childName + '/static'),
    ignore: ['.*']
  });
}

let sysConfigExits = fse.pathExistsSync(resolve('public/config.local.js'));

if (sysConfigExits) {
  copyPlugin.push({
    from: resolve('public/config.local.js'),
    to: resolve('dist/' + childName + '/sysconfig.js')
  });
}

utils.generateVersion();

let sysVersionExits = fse.pathExistsSync(resolve(`node_modules/${childName}/.tmp/version.js`));

if (sysVersionExits) {
  copyPlugin.push({
    from: resolve(`node_modules/${childName}/.tmp/version.js`),
    to: resolve('dist/' + childName + '/version.js')
  });
}

const webpackConfig = {
  mode: 'production',
  entry: entries,
  devtool: '#source-map',
  output: {
    path: resolve('dist'),
    publicPath: process.env.NODE_ENV === 'production' ? childName + '/' : '/',
    filename: '[name].[chunkhash:8].js',
    chunkFilename: utils.spJsPath(`[name].[chunkhash:8].js`),
    library: `_${childName}`,
    libraryTarget: 'umd'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: aliasMap,
    modules: [resolve('node_modules')]
  },
  optimization: {
    minimize: true,
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
        sourceMap: false, // Must be set to true if using source-maps in production
        extractComments: false
      })
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '_',
      name: true,
      cacheGroups: {
        ['vendors']: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'async',
          priority: -10
        },
        ['default']: {
          minChunks: 2,
          priority: -20,
          chunks: 'async',
          reuseExistingChunk: true
        }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            prettify: false,
            cacheDirectory: resolve('node_modules/.cache/vue-loader'),
            cacheIdentifier: 'vue'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: resolve('src'),
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join(childName, utils.assetsPath('img/[name].[ext]')),
          publicPath: './'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: path.posix.join(childName, utils.assetsPath('fonts/[name].[hash:5].[ext]')),
          publicPath: './'
        }
      },
      ...utils.generateStyleModules({
        sourceMap: false,
        extract: false,
        localIdentName: '[local]_[hash:base64:8]'
      })
    ]
  },
  externals: {
    vue: {
      global: 'Vue', // 外部 library 能够作为全局变量使用。用户可以通过在 script 标签中引入来实现。
      root: 'Vue', // 如果库运行在Node.js环境中
      commonjs: 'vue', // 如果运行在Node.js环境中
      commonjs2: 'vue', // 如果运行在Node.js环境中
      amd: 'vue' // 如果使用require.js等加载
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin(),
    new webpack.BannerPlugin({
      banner:
        'version:' +
        (utils.getSubSystemVersion(childName) || process.env.npm_package_version) +
        ', creation time:' +
        utils.getDateTimeString() // 其值为字符串，将作为注释存在
    }),
    new CopyWebpackPlugin(copyPlugin),
    new WebpackManifestPlugin({
      fileName: resolve(`dist/${childName}/manifest.${Date.now()}.json`),
      generate(seed, files, entrypoints) {
        return files.reduce((manifest, { name, path: manifestFilePath }) => {
          let { root, dir, base } = path.parse(manifestFilePath);
          dir = utils.appendPrefixViews(dir);
          name = utils.appendPrefixViews(name);
          manifestFilePath = utils.appendPrefixViews(manifestFilePath);

          return {
            ...manifest,
            [name + '-' + base]: { path: manifestFilePath, root, dir }
          };
        }, seed);
      }
    })
  ]
};

module.exports = webpackConfig;
