module.exports = (api, options, rootOptions) => {
  if (options.preset === 'v2') {
    api.extendPackage({
      dependencies: {
        'element-ui': '^2.15.6'
      }
    });
  } else {
    api.extendPackage({
      dependencies: {
        'element-plus': '^1.1.0-beta.24'
      }
    });
  }
  if (options.preset === 'v2') {
    api.render('../ui/element');
  } else {
    api.render('../ui/element-v3');
  }
  api.onCreateComplete(() => {});
};
