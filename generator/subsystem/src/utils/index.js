// 检测是否是财富中台外框架
export function checkIsHwsContainer() {
  return window.fetch && typeof window.fetch.post === 'function';
}
