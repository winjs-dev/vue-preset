<%_ if (options.application === 'mobile' || options.application === 'offline') { _%>
import 'lib-flexible';
<%_ } _%>
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './icons';
import './router/router.interceptor';
import './filters';
import './services';
import './registerServiceWorker';
import './bus';
<%_ if (options['ui-framework'] === 'element-ui') { _%>
import './vendor/element';
<%_ } else if (options['ui-framework'] === 'iview') { _%>
import './vendor/iview';
<%_ } else if (options['ui-framework'] === 'ant') { _%>
import './vendor/ant';
<%_ } _%>
<%_ if (options.application === 'offline') { _%>
import {isLightOS, nativeReady} from 'native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
<%_ } _%>

import './assets/less/app.less';

Vue.config.productionTip = process.env.NODE_ENV === 'production';

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
