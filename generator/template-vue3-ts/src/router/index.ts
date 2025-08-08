/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2020/10/14
 * @description 定义路由模块
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/hello',
    name: 'hello',
    component: () => import('@views/hello/index.vue'),
    meta: {
      title: '首页'
    }
  },
  {
    path: '/',
    redirect: '/hello'
  }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export function setupRouter(app) {
  app.use(router);
}

export default router;
