/**
 *
 * @authors liwb (you@example.org)
 * @date    2019-04-29 09:31
 * @version $ IIFE
 */
const pcUI = [
  {
    name: 'Element UI',
    value: 'element-ui'
  },
  {
    name: 'ant-design-vue',
    value: 'ant'
  },
  {
    name: 'none',
    value: 'none'
  }
];

// 没有用vue3实现
const pcUI2 = [
  ...pcUI,
  {
    name: 'h_ui',
    value: 'hui'
  },
  {
    name: 'iView',
    value: 'iview'
  }
];

module.exports = [
  {
    name: 'preset',
    type: 'list',
    message: 'Please pick a preset',
    choices: [
      {
        name: 'Vue 2',
        value: 'v2'
      },
      {
        name: 'Vue 3',
        value: 'v3'
      },
      {
        name: 'miniprogram',
        value: 'mini'
      }
    ],
    default: 'v2'
  },
  {
    name: 'language',
    type: 'list',
    message: 'Choose whether your develop language is a JS or TS(default:JS)',
    when: (answers) => answers.preset !== 'mini',
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
    name: 'build-tools',
    type: 'confirm',
    message: 'Whether you need to add the build tool Vite?',
    when: (answers) => answers.preset === 'v2',
    initial: true
  },
  {
    name: 'application',
    type: 'list',
    message: 'Choose whether your app is a PC or a mobile(default:mobile)',
    when: (answers) => answers.preset !== 'mini',
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
      return /^[0-9a-z]{4,8}$/.test(val)
        ? true
        : '请输入4-8位的小写英文字母或数字，注意唯一性';
    },
    when: (answers) =>
      answers.preset !== 'mini' && answers.application === 'offline',
    default: '离线包 ID'
  },
  {
    name: 'offline-name',
    type: 'input',
    message: 'Fill in the offline package name',
    validate: function (val) {
      return /^[\u4e00-\u9fa5a-zA-Z0-9]{1,10}$/.test(val)
        ? true
        : '请输入1-10位的中英文字符或数字';
    },
    when: (answers) =>
      answers.preset !== 'mini' && answers.application === 'offline',
    default: '离线包中文描述'
  },
  {
    name: 'ui-framework',
    type: 'list',
    message: 'Choice UI Framework(default:none)',
    choices: (answers) => (answers.preset === 'v2' ? pcUI2 : pcUI),
    when: (answers) =>
      answers.preset !== 'mini' && answers.application === 'pc',
    default: 'none'
  },
  {
    name: 'layout-adapter',
    type: 'list',
    message: 'Choose a mobile layout adaptation plan(default:rem)',
    when: (answers) => answers.preset !== 'mini' && answers.application !== 'pc',
    choices: [
      {
        name: 'viewpoint',
        value: 'vw'
      },
      {
        name: 'rem',
        value: 'rem'
      }
    ],
    default: 'rem'
  },
  {
    name: 'mobile-ui-framework',
    type: 'list',
    message: 'Choice Mobile UI Framework(default:WinUI)',
    choices: [
      {
        name: 'WinUI',
        value: 'wui'
      },
      {
        name: 'Vant',
        value: 'vant'
      }
    ],
    when: (answers) =>
      answers.preset !== 'mini' &&
      (answers.application === 'mobile' || answers.application === 'offline'),
    default: 'wui'
  },
  {
    name: 'version-control',
    type: 'list',
    message: 'Choose the Version control tool(default:svn)?',
    choices: [
      {
        name: 'SVN',
        value: 'svn'
      },
      {
        name: 'Git',
        value: 'git'
      }
    ],
    default: 'svn'
  },
  {
    name: 'mirror-source',
    type: 'confirm',
    message: 'Whether it is an internal project of the company?',
    when: (answers) => answers.preset !== 'mini',
    initial: true
  },
  {
    name: 'see-package',
    type: 'confirm',
    message: 'Whether to support the generation of see platform publications?',
    when: (answers) =>
      answers.preset !== 'mini' && answers['mirror-source'] === true,
    initial: true
  }
];
