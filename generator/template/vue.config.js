'use strict';

const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const {formatDate} = require('@liwb/cloud-utils');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const VueRouterInvokeWebpackPlugin = require('@liwb/vue-router-invoke-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const svnInfo = require('svn-info');

const N = '\n';
const resolve = (dir) => {
  return path.join(__dirname, './', dir);
};

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};

// 获取 svn 信息
const getSvnInfo = () => {
  const svnURL = '';
  if (svnURL) return svnInfo.sync(svnURL, 'HEAD').lastChangedRev;

  return 'unknown';
};

const genPlugins = () => {
  const plugins = [
    new ProgressBarPlugin({
      format: '  build [:bar] ' + chalk.green.bold(':percent') + ' (:elapsed seconds)',
      clear: false
    }),
    new VueRouterInvokeWebpackPlugin({
      dir: 'src/views',
      // must set the alias for the dir option which you have set
      alias: '@/views',
      mode: 'hash',
      routerDir: 'src/router',
      ignore: ['images', 'components'],
      redirect: [
        {
          redirect: '/hello',
          path: '/'
        }
      ]
    }),
    // 为静态资源文件添加 hash，防止缓存
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, './public/config.local.js'),
        hash: true,
      },
      {
        filepath: path.resolve(__dirname, './public/console.js'),
        hash: true,
      }
    ]),
  ];

  if (isProd()) {
    plugins.push(
      // bannerPlugin
      new webpack.BannerPlugin({
        banner:
          `@author: Winner FED${
            N}@version: ${pkg.version}${
            N}@description: Build time ${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')} and svn version ${getSvnInfo()}
          `
      })<%_ if (options.application !== 'offline') { _%>,
      new CompressionWebpackPlugin({
        filename: '[path].gz[query]',
        algorithm: 'gzip',
        test: new RegExp(
          '\\.(' +
          ['js', 'css'].join('|') +
          ')$'
        ),
        threshold: 10240,
        minRatio: 0.8,
        cache: true
      })
    <%_ } _%>
    );
  }

  return plugins;
};

// 生产环境去掉 console.log
const getOptimization = () => {
  let optimization = {};
  if (isProd()) {
    optimization = {
      // https://webpack.docschina.org/configuration/optimization/#optimization-minimizer
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            // https://github.com/webpack-contrib/terser-webpack-plugin#terseroptions
            compress: {
              warnings: false,
              drop_console: true,
              drop_debugger: true,
              pure_funcs: ['console.log']
            }
          }
        })
      ]
    };
  }
  return optimization;
};

module.exports = {
  /**
   * You can set by yourself according to actual condition
   * You will need to set this if you plan to deploy your site under a sub path,
   * for example GitHub pages. If you plan to deploy your site to https://foo.github.io/bar/,
   * then assetsPublicPath should be set to "/bar/".
   * In most cases please use '/' !!!
   * Detail https://cli.vuejs.org/config/#publicPath
   *  publicPath: process.env.NODE_ENV === 'production' ? `/${pkg.name}/` : './'
   */
  publicPath: './',
  assetsDir: 'static',
  lintOnSave: process.env.NODE_ENV !== 'production',
  productionSourceMap: false,
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: '0.0.0.0',
    port: 3000,
    https: false,
    hotOnly: false,
    overlay: {
      warnings: false,
      errors: true
    }
    // 代理示例 https://webpack.docschina.org/configuration/dev-server/#devserver-proxy
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost:8000', // 后端接口地址
    //     ws: true,
    //     changeOrigin: true, // 是否允许跨域
    //     pathRewrite: {
    //       '^/api': ''   // 直接用'api/接口名'进行请求.
    //     }
    //   }
    // }
  },
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {}
  },
  configureWebpack: () => ({
    name: `${pkg.name}`,
    resolve: {
      alias: {
        '@': resolve('src'),
        '@assets': resolve('src/assets'),
        '@less': resolve('src/assets/less'),
        '@js': resolve('src/assets/js'),
        '@components': resolve('src/components'),
        '@mixins': resolve('src/mixins'),
        '@filters': resolve('src/filters'),
        '@store': resolve('src/store'),
        '@views': resolve('src/views'),

        // 文件别名
        'services': resolve('src/services'),
        'variable': resolve('src/assets/less/variable.less'),
        'utils': resolve('node_modules/@liwb/cloud-utils/dist/cloud-utils.esm'),
        'mixins': resolve('node_modules/magicless/magicless.less'),
        <%_ if (options.application === 'offline') { _%>
        'native-bridge-methods': resolve('node_modules/native-bridge-methods/dist/native-bridge-methods.esm')
        <%_ } _%>
      }
    },
    plugins: genPlugins(),
    // https://github.com/cklwblove/vue-cli3-template/issues/12
    optimization: getOptimization()
  }),
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => {
    // module

    // svg
    // exclude icons
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end();
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('url-loader')
      .loader('url-loader')
      .end();

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-eval-source-map')
      );

    // plugin

    // preload
    // runtime.js 内联的形式嵌入
    config
      .plugin('preload')
      .tap(args => {
        args[0].fileBlacklist.push(/runtime\./);
        return args;
      });

    // webpack-html-plugin
    config
      .plugin('html')
      .tap((args) => {
        args[0].minify = {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true
        };
        return args;
      });

    // set preserveWhitespace
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        options.compilerOptions.preserveWhitespace = true;
        return options;
      })
      .end();

    // optimization
    config
      .when(process.env.NODE_ENV === 'production',
        config => {
          config
            .plugin('ScriptExtHtmlWebpackPlugin')
            .after('html')
            .use('script-ext-html-webpack-plugin', [{
              // `runtime` must same as runtimeChunk name. default is `runtime`
              inline: /runtime\..*\.js$/
            }])
            .end();

          config
            .optimization
            .splitChunks({
              chunks: 'all',
              cacheGroups: {
                vendors: {
                  name: 'chunk-vendors',
                  test: /[\\/]node_modules[\\/]/,
                  priority: 10,
                  chunks: 'initial' // 只打包初始时依赖的第三方
                },
                commons: {
                  name: 'chunk-commons',
                  test: resolve('src/components'), // 可自定义拓展你的规则
                  minChunks: 3, // 最小公用次数
                  priority: 5,
                  reuseExistingChunk: true
                }
              }
            });
          config.optimization.runtimeChunk('single');
        }
      );
  },
  pluginOptions: {
    lintStyleOnBuild: true,
    stylelint: {}
  }
};
