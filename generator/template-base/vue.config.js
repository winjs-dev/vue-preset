'use strict';

const path = require('path');
const pkg = require('./package.json');
const webpack = require('webpack');
const {formatDate} = require('@winner-fed/cloud-utils');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
<%_ if (options.application !== 'pc') { _%>
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
<%_ } _%>
const WebpackBar = require('webpackbar');
<%_ if (options.preset === 'v2') { _%>
const VueRouterInvokeWebpackPlugin = require('@winner-fed/vue-router-invoke-webpack-plugin');
<%_ } _%>
const TerserPlugin = require('terser-webpack-plugin');
const {WebpackManifestPlugin} = require('webpack-manifest-plugin');
<%_ if (options.language === 'ts' && options['mobile-ui-framework'] === 'vant') { _%>
const tsImportPluginFactory = require('ts-import-plugin');
const merge = require('webpack-merge');
<%_ } _%>
<%_ if (options['version-control'] === 'svn') { _%>
const svnInfo = require('svn-info');
<%_ } _%>
<%_ if (options['build-tools']) { _%>
const {readFileSync, writeFileSync, existsSync, mkdirSync} = require('fs');
const {genHtmlOptions} = require('./build/utils');

const indexPath = path.resolve(__dirname, './index.html');
const tmpDir = path.resolve(__dirname, 'node_modules/.tmp/build');
/**
 * 创建文件夹
 * @param {String} pathStr 文件夹路径
 */
function mkdirSyncRecursive(pathStr) {
  if (existsSync(pathStr)) return true;
  mkdirSync(pathStr, {
    recursive: true
  });
}

mkdirSyncRecursive(tmpDir);
<%_ } _%>
<%_ if (options.preset === 'v3') { _%>
const svgFilePath = ['src/icons/svg'].map((v) => path.resolve(v));
<%_ } _%>
const N = '\n';
const resolve = (dir) => {
  return path.join(__dirname, './', dir);
};

const isProd = () => {
  return process.env.NODE_ENV === 'production';
};
<%_ if (options['version-control'] === 'svn') { _%>
  // 获取 svn 信息
const getSvnInfo = () => {
  const svnURL = '';
  if (svnURL) return svnInfo.sync(svnURL, 'HEAD').lastChangedRev;

  return 'unknown';
};
<%_ } _%>
const genPlugins = () => {
  const plugins = [
    new WebpackBar()<%_ if (options.preset === 'v2') { _%>,
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
    })<%_ } _%><%_ if (options.application !== 'pc') { _%>,
    // 为静态资源文件添加 hash，防止缓存
    new AddAssetHtmlPlugin([
      {
        filepath: path.resolve(__dirname, './public/console.js'),
        hash: true,
      }
    ])
  <%_ } _%>
  ];

  if (isProd()) {
    plugins.push(
      // bannerPlugin
      new webpack.BannerPlugin({
        banner:
          `@author: Winner FED${
            N}@version: ${pkg.version}${
            N}@description: Build time ${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}<%_ if (options['version-control'] === 'svn') { _%> and svn version ${getSvnInfo()}<%_ } _%>
          `
      }),
      new WebpackManifestPlugin({
        fileName: path.resolve(
          __dirname,
          'dist',
          `manifest.${Date.now()}.json`
        ),
        filter: ({name, path}) => !name.includes('runtime'),
        generate (seed, files, entries) {
          return files.reduce((manifest, {name, path: manifestFilePath}) => {
            const {root, dir, base} = path.parse(manifestFilePath);
            return {
              ...manifest,
              [name + '-' + base]: {path: manifestFilePath, root, dir}
            };
          }, seed);
        }
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
  <%_ if (options.language === 'ts') { _%>
  pwa: {
    name: `${pkg.name}`,
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: path.resolve(__dirname, 'src/pwa/service-worker.js')
    }
  },
  <%_ } _%>
  <%_ if (options.language === 'js' && options.preset === 'v3') { _%>
  transpileDependencies: ['vue', 'vue-router', '@vue'],
  <%_ } _%>
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: isProd() ? true : false,
    // 开启 CSS source maps?
    sourceMap: isProd() ? true : false,
    // css预设器配置项
    loaderOptions: {
      less: {
        // 全局注入变量及mixins
        additionalData: `@import "@/assets/style/variable.less";@import "@winner-fed/magicless/magicless.less";`,
      }
    }
  },
  configureWebpack: () => ({
    name: `${pkg.name}`,
    resolve: {
      alias: {
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
        mixins: resolve('node_modules/@winner-fed/magicless/magicless.less'),
        <%_ if (options.application === 'offline') { _%>
        'native-bridge-methods': resolve('node_modules/@winner-fed/native-bridge-methods/dist/native-bridge-methods.esm')
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
  <%_ if (options.preset === 'v3') { _%>
    // svg icon
    config.module
      .rule('vue-svgicon')
      .include.add(svgFilePath)
      .end()
      .test(/\.svg$/)
      .use('svgicon')
      .loader('@winner-fed/svgicon-loader')
      .options({
        svgFilePath
      });
      config.module.rule('svg').exclude.add(svgFilePath).end();
      config.resolve.alias.set('@icon', svgFilePath[0]);
    <%_ } _%>
    <%_ if (options.preset === 'v2') { _%>
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
    <%_ } _%>
  <%_ if (options.language === 'ts' && options['mobile-ui-framework'] === 'vant') { _%>
    config.module
      .rule('ts')
      .use('ts-loader')
      .tap(options => {
        options = merge(options, {
          transpileOnly: true,
          getCustomTransformers: () => ({
            before: [
              tsImportPluginFactory({
                libraryName: 'vant',
                libraryDirectory: 'es',
                style: true
              })
            ]
          }),
          compilerOptions: {
            module: 'es2015'
          }
        });
        return options;
      })
      .end();
    <%_ } _%>

    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-eval-source-map')
      );

    // plugin

    // preload
    // it can improve the speed of the first screen, it is recommended to turn on preload
    config
      .plugin('preload')
      .tap(() => [
      {
        rel: 'preload',
        // to ignore runtime.js
        // https://github.com/vuejs/vue-cli/blob/dev/packages/@vue/cli-service/lib/config/app.js#L171
        fileBlacklist: [/\.map$/, /hot-update\.js$/, /runtime\..*\.js$/],
        include: 'initial'
      }
    ]);

    // when there are many pages, it will cause too many meaningless requests
    config
      .plugins
      .delete('prefetch');

    // webpack-html-plugin
    config
      .plugin('html')
      .tap((args) => {
      <%_ if (options['build-tools']) { _%>
          const htmlOptions = genHtmlOptions();
          const htmlStr = readFileSync(indexPath).toString();
          const tmpHtmlPath = path.resolve(tmpDir, './index.html');

          writeFileSync(tmpHtmlPath, htmlStr);

          args[0].template = tmpHtmlPath;
          args[0].title = htmlOptions.title;

          args[0].filename = './index.html';
          args[0].templateParameters = (
            compilation,
            assets,
            assetTags,
            options
          ) => {
            return {
              compilation,
              webpackConfig: compilation.options,
              htmlWebpackPlugin: {
                tags: assetTags,
                files: assets,
                options,
              },
              ...htmlOptions,
            };
          };
        <%_ } _%>
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

  <%_ if (options.preset === 'v2') { _%>
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
    <%_ } _%>
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
