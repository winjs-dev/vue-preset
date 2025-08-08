import 'core-js/stable';
import 'regenerator-runtime/runtime';
<%_ if ((options.application === 'mobile' || options.application === 'offline') && options['layout-adapter'] !== 'vw') { _%>
import 'amfe-flexible';
<%_ } _%>
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import './router/router.interceptor';
import './components/global';
import './icons';
import './filters';
import './services';
<%_ if (options['ui-framework'] === 'element-ui') { _%>
import './vendor/element';
<%_ } else if (options['ui-framework'] === 'iview') { _%>
import './vendor/iview';
<%_ } else if (options['ui-framework'] === 'ant') { _%>
import './vendor/ant';
<%_ } else if (options['ui-framework'] === 'hui') { _%>
import './vendor/hui';
<%_ } else if (options['mobile-ui-framework'] === 'vant') { _%>
import './vendor/vant';
<%_ } else if (options['mobile-ui-framework'] === 'wui') { _%>
import './vendor/wui';
<%_ } _%>
<%_ if (options.application === 'offline') { _%>
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
<%_ } _%>

import './assets/style/app.less';

/* eslint-disable */
Vue.config.productionTip = process.env.NODE_ENV === 'production';

<%_ if (options.application === 'offline') { _%>
if (isLightOS()) {
  nativeReady().then(() => {
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
