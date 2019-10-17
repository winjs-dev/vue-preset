<%_ if (options.application === 'mobile') { _%>
import 'lib-flexible';
<%_ } _%>
import Vue from 'vue';
import App from './App.vue';
import router from './router/.invoke/router.js';
import './components/global';
import './common/errorPlugin';
import './icons';
import './filters';
import './services';
<%_ if (options['ui-framework'] === 'element-ui') { _%>
import './vendor/element';
<%_ } else if (options['ui-framework'] === 'iview') { _%>
import './vendor/iview';
<%_ } else if (options['ui-framework'] === 'ant') { _%>
import './vendor/ant';
<%_ } _%>
<%_ if (options.application === 'offline') { _%>
import nativeBridgeMethods from 'native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
window.nativeBridgeMethods = nativeBridgeMethods;
<%_ } _%>

/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === 'production';

<%_ if (options.application === 'offline') { _%>
if (nativeBridgeMethods.isLightOS()) {
  nativeBridgeMethods.nativeReady().then(() => {
    new Vue({
      el: '#app',
      router,
      // use Runtime-only
      // https://vuejs.org/v2/guide/installation.html
      render: (h) => h(App),
    });
  });
} else {
  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    // use Runtime-only
    // https://vuejs.org/v2/guide/installation.html
    render: (h) => h(App),
  });
}
<%_ } else { _%>
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  // use Runtime-only
  // https://vuejs.org/v2/guide/installation.html
  render: (h) => h(App)
});
<%_ } _%>
