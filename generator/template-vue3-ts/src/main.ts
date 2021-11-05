import 'core-js/stable';
import 'regenerator-runtime/runtime';
<%_ if ((options.application === 'mobile' || options.application === 'offline') && options['layout-adapter'] !== 'vw') { _%>
import 'amfe-flexible';
<%_ } _%>
import { createApp } from 'vue';
import App from './App.vue';
import { setupRouter } from './router';
import './router/router.interceptor';
import { setGlobalProperties } from '@/services';
import './pwa/register-service-worker';
import setupSvgIcon from './icons';
<%_ if (options['ui-framework'] === 'element-ui') { _%>
import setupVendor from './vendor/element';
<%_ } else if (options['ui-framework'] === 'iview') { _%>
import './vendor/iview';
<%_ } else if (options['ui-framework'] === 'ant') { _%>
import setupVendor from './vendor/ant';
<%_ } else if (options['ui-framework'] === 'hui') { _%>
import './vendor/hui';
<%_ } else if (options['mobile-ui-framework'] === 'vant') { _%>
import setupVendor from './vendor/vant';
<%_ } _%>
<%_ if (options.application === 'offline') { _%>
import {isLightOS, nativeReady} from '@winner-fed/native-bridge-methods';
import LightSDK from 'light-sdk/dist/index.umd';

window.LightSDK = LightSDK;
<%_ } _%>
import { setApp } from './useApp';

import './assets/style/app.less';

const app = createApp(App);

setGlobalProperties(app);
<%_ if (options['ui-framework'] === 'element-ui' || options['ui-framework'] === 'ant' || options['mobile-ui-framework'] === 'vant') { _%>
setupVendor(app);
<%_ } _%>
setupSvgIcon(app);
setupRouter(app);

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
setApp(app);



