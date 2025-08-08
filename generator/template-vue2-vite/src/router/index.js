import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
export const routes = [
  {
    component: () => import('@/views/hello/index.vue'),
    name: 'hello',
    path: '/hello',
    meta: {
      title: '首页'
    }
  },
  {
    path: '/',
    redirect: '/hello'
  }
];
const router = new Router({
  mode: 'hash',
  routes
});
export default router;
