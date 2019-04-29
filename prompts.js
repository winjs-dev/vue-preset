/**
 *
 * @authors liwb (you@example.org)
 * @date    2019-04-29 09:31
 * @version $ IIFE
 */
module.exports = [
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
      }
    ],
    default: 'mobile'
  },
  {
    name: 'ui-framework',
    type: 'list',
    message: 'choice UI Framework(default:Element UI)',
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
      }
    ],
    when: answers => answers.application === 'pc',
    default: 'element-ui'
  }
];