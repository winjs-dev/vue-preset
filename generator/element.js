module.exports = (api, options, rootOptions) => {
  api.extendPackage({
    dependencies: {
      'element-ui': '^2.8.2'
    }
  });
  api.render('../ui/element');
  api.injectImports('src/vendor/index.js', `import './element.js'`);
  api.onCreateComplete(() => {
  });
};
