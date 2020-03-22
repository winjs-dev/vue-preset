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
    name: 'ui-framework',
    type: 'list',
    message: 'choice UI Framework(default:none)',
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
  }
];