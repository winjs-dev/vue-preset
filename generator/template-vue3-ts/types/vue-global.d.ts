// TODO 不能删除，删除就报错
import { createApp } from 'vue';

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $services: any;
  }
}
