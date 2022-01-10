module.exports = {
  // 行尾需要有分号
  semi: true,
  // 不使用缩进符，而使用空格
  useTabs: false,
  // 使用 2 个空格缩进
  tabWidth: 2,
  // 一行最多 120 字符
  printWidth: 120,
  // 使用单引号
  singleQuote: true,
  // 末尾无逗号
  trailingComma: 'none',
  // 使用默认的折行标准
  proseWrap: 'preserve',
  // 大括号内的首尾需要空格
  bracketSameLine: true,
  // 箭头函数，只有一个参数的时候，也需要括号
  arrowParens: 'always',
  // 对象的 key 仅在必要时用引号
  quoteProps: 'as-needed',
  // jsx 不使用单引号，而使用双引号
  jsxSingleQuote: false,
  // vue 文件中的 script 和 style 内需要缩进
  vueIndentScriptAndStyle: true,
  // 根据显示样式决定 html 要不要折行
  htmlWhitespaceSensitivity: 'css',
  // 不需要自动在文件开头插入 @prettier
  insertPragma: false,
  // 不需要写文件开头的 @prettier
  requirePragma: false,
  // 换行符使用 lf
  endOfLine: 'lf',
  // 每个文件格式化的范围是文件的全部内容
  rangeStart: 0,
  rangeEnd: Infinity,
  // 格式化内嵌代码
  embeddedLanguageFormatting: 'auto',
  overrides: [
    {
      files: ['*.less', '*.css'],
      options: {
        singleQuote: false
      }
    }
  ]
};
