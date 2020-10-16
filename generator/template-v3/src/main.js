import 'core-js/stable';
import 'regenerator-runtime/runtime';
<%_ if (options.application === 'mobile' || options.application === 'offline') { _%>
import 'lib-flexible';
<%_ } _%>
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './router/router.interceptor';
import FUNS from '@/services';
import './components/global';
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
<%_ } _%>
import { VueSvgIconPlugin } from '@yzfe/vue3-svgicon';
import '@yzfe/svgicon/lib/svgicon.css';
<%_ if (options.application === 'offline') { _%>
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
<%_ } _%>

import './assets/style/app.less';

const app = createApp(App);
app.config.globalProperties.$services = FUNS;

// use 插件
app
  .use(router)
  .use(VueSvgIconPlugin, {
    tagName: 'svg-icon'
  });

<%_ if (options.application === 'offline') { _%>
if (isLightOS()) {
  nativeReady().then(() => {
    app.mount('#app');
  });
} else {
  app.mount('#app');
}
<%_ } else { _%>
app.mount('#app');
<%_ } _%>
