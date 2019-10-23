import router from './.invoke/router';
import { isLightOS, navigateTo } from 'native-bridge-methods';

router.beforeEach((to, from, next) => {
  if (from.name && isLightOS()) {
    navigateTo({url: `${window.location.href.split('#')[0]}#${to.fullPath}`})
  } else {
    next();
  }
});