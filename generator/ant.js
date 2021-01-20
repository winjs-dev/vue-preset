module.exports = (api, options, rootOptions) => {
  if (options.preset === 'v2') {
    api.extendPackage({
      dependencies: {
        'ant-design-vue': '^1.3.8'
      }
    });
  } else {
    api.extendPackage({
      dependencies: {
        'ant-design-vue': '^2.0.0-beta.10'
      }
    });
  }
  if (options.preset === 'v2') {
    api.render('../ui/ant-design-vue');
  } else {
    api.render('../ui/ant-design-vue-v3');
  }
  api.injectImports('src/vendor/index.js', `import './ant.js'`);
  api.onCreateComplete(() => {});
};
