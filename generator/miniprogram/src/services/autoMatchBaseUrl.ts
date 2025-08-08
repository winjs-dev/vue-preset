import { combineURLs } from '@winner-fed/cloud-utils/dist/cloud-utils.esm.js';
import { BASE_URL } from '@/constants/constant';

/**
 * 根据前缀，自动匹配基础的url
 * 根据项目所需，自己扩展
 * @param prefix
 * @returns {string}
 */
export default function autoMatchBaseUrl(prefix: string = '') {

  return combineURLs(BASE_URL, prefix);
}
