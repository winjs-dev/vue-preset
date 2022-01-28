import FUNS from '@/services';
import { routes } from './router';
import { filters } from './filters';
import Locales from './locales';

// icons
import SvgIcon from 'vue-svgicon';
import './icons/svg-icon.less';
import './icons/components';

import './assets/style/app.less';

const plugin = {
  install(Vue, options) {
    // icons
    Vue.use(SvgIcon, {
      tagName: 'svg-icon',
      defaultWidth: '1em',
      defaultHeight: '1em'
    });

    // register global utility filters.
    Object.keys(filters).forEach((key) => {
      Vue.filter(key, filters[key]);
    });

    Object.defineProperty(Vue.prototype, '$services', { value: FUNS });

    // 自动全局注入组件
    // 自动加载 global 目录下的 .vue 结尾的文件
    const componentsContext = require.context('./components/global', true, /\.vue$/);

    componentsContext.keys().forEach((component) => {
      const componentConfig = componentsContext(component);
      // 兼容 import export 和 require module.export 两种规范
      const ctrl = componentConfig.default || componentConfig;
      Vue.component(ctrl.name, ctrl);
    });
  }
};

/**
 * @description 注册对应的子系统router到框架
 */
function generateRouterModules(routers = []) {
  const result = {};
  routers.forEach((item) => {
    if (item.component && item.name) {
      result[item.name] = item.component;
    }
  });
  return result;
}

/**
 * @description 兼容框架 1.0 集成的入口文件
 *
 * 认识框架 1.0 的主子系统开发模式
 * 1. 子系统实际上是个资源的集合，包括视图组件、状态模块或者是语言文件等等
 * 2. 子系统本身不是一个独立的应用，没有消费这些资源的能力，自然也就没有路由的能力
 * 3. 子系统依赖的全局特性，理论上只能在视图组件内部访问，比如 this.$store，this.$router 等等
 * 4. 在该文件内定义的方法或者组件是有可能被覆盖的，而且可能性非常高
 */

export default {
  router: generateRouterModules(routes),

  // 状态模块
  store: {},

  // 实例方法
  utils: {},

  // 自定义指令 https://cn.vuejs.org/v2/guide/custom-directive.html
  directives: {},

  // 全局组件 https://cn.vuejs.org/v2/guide/components-registration.html
  components: {},

  // 插件 https://cn.vuejs.org/v2/guide/plugins.html
  uses: {
    plugin
  },

  // 基于 vue-i18n 实现的语言切换功能
  i18n: Locales,

  /**
   * 引导函数, 执行的时机是在组件、语言包等子系统资源加载完毕之后, 子系统路由注册之前
   * @param {Object.store} store - 支持在子系统加载时访问全局的状态仓库
   * @param {Object.tabs} tabs - 不建议在这里执行 tab 操作，容易引起循环加载，导致浏览器崩溃
   * @param {Function} done - 执行结束后必须调用 done 结束调用
   */
  bootstrap({ store, tabs }, done) {
    // store.dispatch("...");
    // mergeLocaleFromUrl("//127.0.0.1:8091/static/locale/demo.js").finally(done); // 合并子系统外部定义的语言文件
    // console.log(data, done, 111111)
    // console.log(Vue.prototype)
    done();
  }
};

/**
 * @description 合并 url 指定的语言包文件, 要求必须符合 requirejs 的模块规范 https://github.com/requirejs/requirejs
 * @param {String} url 语言文件路径, 应该是相对于根目录的一个路径地址, 如 “./static/locale/demo.js”
 * @param {Function} cb 回调函数
 * @returns {Promise}
 */
// export function mergeLocaleFromUrl(url) {
//   return new Promise((resolve, reject) => {
//     // if (url) {
//     //   requirejs(
//     //     [url],
//     //     (data) => {
//     //       for (let key in data) {
//     //         if (["zh-CN", "en-US", "zh-TW"].includes(key)) {
//     //           window.i18n.mergeLocaleMessage(key, data[key]);
//     //         }
//     //       }
//     //
//     //       resolve();
//     //     },
//     //     (error) => {
//     //       reject(error);
//     //     }
//     //   );
//     // } else {
//     //   reject("url is empty");
//     // }
//   });
// }
