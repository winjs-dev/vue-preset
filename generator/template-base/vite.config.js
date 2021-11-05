const path = require('path');
const {defineConfig} = require('vite');
const {createVuePlugin} = require('vite-plugin-vue2');
const {injectHtml} = require('vite-plugin-html');
import ViteComponents from 'vite-plugin-components';
import styleImport from 'vite-plugin-style-import';

const {genHtmlOptions} = require('./build/utils');
const resolve = (dir) => {
  return path.join(__dirname, '.', dir);
};
const libs = [];
<%_ if (options['mobile-ui-framework'] === 'vant') { _%>
libs.push({
  libraryName: 'vant',
  esModule: true,
  resolveStyle: (name) => {
    return `vant/es/${name}/style/index`;
  }
});
<%_ } _%>
// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  define: {
    'process.env': {
      '__TOOL_MODE__': 'vite'
    }
  },
  plugins: [
    createVuePlugin({}),
    injectHtml({
      injectData: genHtmlOptions('vite'),
    }),
    ViteComponents({
      transformer: 'vue2'
    }),
    styleImport({
      libs: libs
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        'additionalData': `@import "@/assets/style/variable.less";@import "@winner-fed/magicless/magicless.less";`
      },
    },
  },
  resolve: {
    alias: [
      {
        // @/xxxx  =>  src/xxx
        find: /^@\//,
        replacement: resolve('src') + '/',
      },
      {
        find: /^utils/,
        replacement: resolve('node_modules/@winner-fed/cloud-utils/dist/cloud-utils.esm'),
      },
    ]
  },
});
