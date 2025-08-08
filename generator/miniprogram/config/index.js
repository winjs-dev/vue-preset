const path = require('path');

const config = {
  projectName: 'myApp',
  date: '2021-3-23',
  designWidth: 750,
  deviceRatio: {
    640: 2.34 / 2,
    750: 1,
    828: 1.81 / 2,
    375: 2 / 1
  },
  sourceRoot: 'src',
  // 达到多端同步调试的目的
  // 微信小程序编译后的目录就会是 dist/weapp，H5 编译后目录就会是 dist/h5。
  outputRoot: `dist/${process.env.TARO_ENV}`,
  plugins: [],
  defineConstants: {
    IS_H5: process.env.TARO_ENV === 'h5',
    IS_RN: process.env.TARO_ENV === 'rn',
    IS_WEAPP: process.env.TARO_ENV === 'weapp'
  },
  alias: {
    '@/components': path.resolve(__dirname, '..', 'src/components'),
    '@/constants': path.resolve(__dirname, '..', 'src/constants'),
    '@/assets': path.resolve(__dirname, '..', 'src/assets'),
    '@/services': path.resolve(__dirname, '..', 'src/services'),
    '@/utils': path.resolve(__dirname, '..', 'src/utils'),
    '@/package': path.resolve(__dirname, '..', 'package.json'),
    '@/project': path.resolve(__dirname, '..', 'project.config.json'),
    '@/store': path.resolve(__dirname, '..', 'src/store'),
    variables: path.resolve(__dirname, '..', 'src/assets/style/variables.scss')
  },
  copy: {
    patterns: [{ from: 'sitemap.json', to: 'dist/sitemap.json' }],
    options: {}
  },
  framework: 'vue',
  mini: {
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      pxtransform: {
        enable: true,
        config: {}
      },
      url: {
        enable: true,
        config: {
          limit: 1024 // 设定转换尺寸上限
        }
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    lessLoaderOption: {
      additionalData: `@import '@/assets/style/variables.less'; @import '@winner-fed/magicless/magicless.less'; @import '@/assets/style/mixins.less';`
    }
  },
  h5: {
    publicPath: '/',
    staticDirectory: 'static',
    output: {
      filename: 'static/js/[name].[hash].js',
      chunkFilename: 'static/js/[name].[chunkhash].js'
    },
    imageUrlLoaderOption: {
      limit: 5000,
      name: 'static/img/[name].[hash].[ext]'
    },
    miniCssExtractPluginOption: {
      filename: 'static/css/[name].[hash].css',
      chunkFilename: 'static/css/[name].[chunkhash].css'
    },
    postcss: {
      autoprefixer: {
        enable: true,
        config: {}
      },
      cssModules: {
        enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        config: {
          namingPattern: 'module', // 转换模式，取值为 global/module
          generateScopedName: '[name]__[local]___[hash:base64:5]'
        }
      }
    },
    devServer: {
      host: '0.0.0.0',
      port: 3001
    },
    lessLoaderOption: {
      additionalData: `@import '@/assets/style/variables.less'; @import '@winner-fed/magicless/magicless.less'; @import '@/assets/style/mixins.less';`
    }
  }
};

module.exports = function (merge) {
  if (process.env.NODE_ENV === 'development') {
    return merge({}, config, require('./dev'));
  }
  return merge({}, config, require('./prod'));
};
