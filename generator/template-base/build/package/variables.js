/**
 *
 * @authors liwb (you@example.org)
 * @date    2022/01/04 11:33
 * @version variables 参考 http://hui.hundsun.com/frame-config/#see-variables
 */

module.exports = {
  variables: [
    {
      type: 'input',
      label: '服务基础路径',
      name: 'API_HOME',
      required: true,
      tooltip: '后端服务接口地址',
      default: 'http://121.12.154.243:9080/h5-api-f/'
    },
    {
      type: 'switch',
      label: '是否启用调试工具',
      name: 'IS_OPEN_VCONSOLE',
      options: 'true:是;false:否',
      required: false,
      tooltip: '是否启用调试工具 vconsole',
      default: 'true'
    }
  ]
};
