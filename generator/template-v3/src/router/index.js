import { createRouter, createWebHashHistory } from 'vue-router';

export const routes = [
  {
    component: () => import('@/views/hello/index.vue'),
    name: 'hello',
    path: '/hello'
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
