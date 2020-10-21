import type { App } from 'vue';

declare global {
  declare interface Window {
    __APP__: App<Element>;
    LOCAL_CONFIG?: any;
    LightSDK?: any;
    $eventBus?: any;
  }
}
