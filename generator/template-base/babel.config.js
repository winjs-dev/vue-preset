const plugins = [];

<%_ if (options['language'] === 'js') { _%>
<%_ if (options['mobile-ui-framework'] === 'vant') { _%>
plugins.push(
  ['import', {
    libraryName: 'vant',
    libraryDirectory: 'es',
    style: true
  }, 'vant']
);
<%_ } _%>
<%_ if (options['mobile-ui-framework'] === 'wui') { _%>
plugins.push(
  ['import', {
    libraryName: '@winner-fed/win-ui',
    libraryDirectory: 'es',
    style: true
  }, '@winner-fed/win-ui']
);
<%_ } _%>
<%_ } _%>

module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset',
      {
        useBuiltIns: 'entry'
      }
    ]
  ],
  plugins
};
