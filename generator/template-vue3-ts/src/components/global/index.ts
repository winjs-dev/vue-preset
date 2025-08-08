// 这里放置需要全局注册的组件
import { getApp } from '@/useApp';

// 自动加载 global 目录下的 .vue 结尾的文件
const componentsContext = require.context('./', true, /\.vue$/);

export function registerGlobComp() {
  componentsContext.keys().forEach((component) => {
    const componentConfig = componentsContext(component);
    // 兼容 import export 和 require module.export 两种规范
    const ctrl = componentConfig.default || componentConfig;
    getApp().component(ctrl.name, ctrl);
  });
}
