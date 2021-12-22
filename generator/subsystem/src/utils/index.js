// 检测是否是财富中台外框架
export function checkIsHwsContainer() {
  return typeof window.fetch && window.fetch.post === 'function';
}
