import router from './index';
<%_ if (options.application === 'offline') { _%>
import { isLightOS, navigateTo } from '@winner-fed/native-bridge-methods';
<%_ } _%>

router.beforeEach((to, from, next) => {
<%_ if (options.application === 'offline') { _%>
  if (from.name && isLightOS()) {
    navigateTo({url: `${window.location.href.split('#')[0]}#${to.fullPath}`})
  } else {
    next();
  }
<%_ } else { _%>
  next();
<%_ } _%>
});
