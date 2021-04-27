/**
 *
 * @authors liwb (lwbhtml@gmail.com)
 * @date    2019/01/12
 * @description 定义路由拦截器模块，比如登录鉴权逻辑等
 */
import { Route } from 'vue-router';
import router from './index';
import { clearPending } from '@/services/pending';

router.beforeEach((to: Route, from: Route, next: any) => {
  clearPending();
  next();
});
