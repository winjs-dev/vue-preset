module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      'ant-design-vue': '^1.3.8'
    }
  });
  api.render('../ui/ant');
  api.injectImports('src/plugins/index.js', `import './ant.js'`);
  api.onCreateComplete(() => {
  });
};
