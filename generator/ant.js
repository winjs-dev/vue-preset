module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      'ant-design-vue': '^1.3.8'
    }
  });
  api.render('../ui/ant-design-vue');
  api.injectImports('src/vendor/index.js', `import './ant.js'`);
  api.onCreateComplete(() => {
  });
};
