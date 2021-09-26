import Vue from 'vue';
import { Button } from '@winner-fed/win-ui';

// 这种使用方法，只是保证了 wui 本身的按需引用，但是针对各个页面，并没有做到。
// 如果需要针对各个页面做，则需要各个页面独立引用
// 按需引用
Vue
  .use(Button);
