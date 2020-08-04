// http://eslint.org/docs/user-guide/configuring
// http://eslint.cn/docs/user-guide/configuring 中文

module.exports = {
  root: true,
  // JavaScript 语言选项
  parserOptions: {
    parser: 'babel-eslint'
  },
  //环境定义了预定义的全局变量。更多在官网查看
  env: {
    node: true
  },
  extends: [
    '@winner-fed/eslint-config-win',
    '@winner-fed/eslint-config-win/vue',
  ]
}
