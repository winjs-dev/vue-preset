/**
 *
 * @authors liwb (you@example.org)
 * @date    2019-04-29 09:31
 * @version $ IIFE
 */
module.exports = [
  {
    name: 'language',
    type: 'list',
    message: 'Choose whether your develop language is a JS or TS(default:JS)',
    choices: [
      {
        name: 'JS',
        value: 'js'
      },
      {
        name: 'TS',
        value: 'ts'
      }
    ],
    default: 'js'
  },
  {
    name: 'application',
    type: 'list',
    message: 'Choose whether your app is a PC or a mobile(default:mobile)',
    choices: [
      {
        name: 'PC',
        value: 'pc'
      },
      {
        name: 'mobile',
        value: 'mobile'
      },
      {
        name: 'H5离线包',
        value: 'offline'
      }
    ],
    default: 'mobile'
  },
  {
    name: 'offline-id',
    type: 'input',
    message: 'Fill in the offline package ID',
    validate: function (val) {
      return /^[0-9a-z]{4,8}$/.test(val) ? true : '请输入4-8位的小写英文字母或数字，注意唯一性';
    },
    when: answers => answers.application === 'offline',
    default: '离线包 ID'
  },
  {
    name: 'offline-name',
    type: 'input',
    message: 'Fill in the offline package name',
    validate: function (val) {
      return /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/.test(val) ? true : '请输入1-10位的中英文字符或数字';
    },
    when: answers => answers.application === 'offline',
    default: '离线包中文描述'
  },
  {
    name: 'ui-framework',
    type: 'list',
    message: 'Choice UI Framework(default:none)',
    choices: [
      {
        name: 'Element UI',
        value: 'element-ui'
      },
      {
        name: 'iView',
        value: 'iview'
      },
      {
        name: 'ant-design-vue',
        value: 'ant'
      },
      {
        name: 'h_ui',
        value: 'hui'
      },
      {
        name: 'none',
        value: 'none'
      }
    ],
    when: answers => answers.application === 'pc',
    default: 'none'
  },
  {
    name: 'mobile-ui-framework',
    type: 'list',
    message: 'Choice Mobile UI Framework(default:none)',
    choices: [
      {
        name: 'Vant',
        value: 'vant'
      },
      {
        name: 'none',
        value: 'none'
      }
    ],
    when: answers => answers.application === 'mobile' || answers.application === 'offline',
    default: 'none'
  },
  {
    name: 'mirror-source',
    type: 'confirm',
    message: 'Whether it is an internal project of the company?',
    initial: true
  },
];