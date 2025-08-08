const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  env: {
    NODE_ENV: '"production"'
  },
  defineConstants: {},
  mini: {},
  h5: {
    publicPath: './',
    webpackChain(chain) {
      // 阻止生成 *.license.txt
      chain.plugin('terser').use(TerserPlugin, [
        {
          extractComments: false
        }
      ]);
      // 如果h5端编译后体积过大，可以使用webpack-bundle-analyzer插件对打包体积进行分析。
      // 参考代码如下：
      chain.plugin('analyzer').use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin, []);
    }
  }
};
