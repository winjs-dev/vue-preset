/**
 *
 * @authors liwb (you@example.org)
 * @date    2020/12/16 11:33
 * @version 此文件对应的是 meta.json， 详见 http://hui.hundsun.com/community/topic/147/%E5%88%A9%E7%94%A8-see-%E5%B9%B3%E5%8F%B0%E7%9A%84%E6%A8%A1%E7%89%88%E9%85%8D%E7%BD%AE%E8%83%BD%E5%8A%9B%E5%8A%A8%E6%80%81%E4%BF%AE%E6%94%B9-api_home
 */

module.exports = {
  version: '1.0.0',
  'style-isolate': false,
  prefetch: true,
  variables: [
    {
      type: 'input',
      label: '服务基础路径',
      name: 'API_HOME',
      default: 'http://121.12.154.243:9080/h5-api-f/'
    },
    {
      type: 'switch',
      label: '是否启用调试工具',
      name: 'IS_OPEN_VCONSOLE',
      options: 'true:是;false:否',
      default: 'true'
    }
  ]
};
