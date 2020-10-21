import type { App } from 'vue';

declare global {
  declare interface Window {
    __APP__: App<Element>;
    LOCAL_CONFIG?: any;
    LightSDK?: any;
    $eventBus?: any;
  }
}

// @winner-fed/cloud-utils -> webpack alias utils
declare module 'utils';

declare module '*.png';

declare module '*.gif';

declare module 'api';
