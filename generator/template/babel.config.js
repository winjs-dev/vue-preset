const plugins = [];

<%_ if (options['mobile-ui-framework'] === 'vant') { _%>
plugins.push(
  ['import', {
    libraryName: 'vant',
    libraryDirectory: 'es',
    style: true
  }, 'vant']
);
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
