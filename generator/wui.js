module.exports = (api, options, rootOptions) => {
  let devDependencies = {};
  if (options.language === 'js') {
    devDependencies = {
      'babel-plugin-import': '^1.13.0'
    };
  } else {
    devDependencies = {
      'ts-import-plugin': '^1.6.6'
    };
  }

  if (options.preset === 'v2') {
    api.extendPackage({
      dependencies: {
        '@winner-fed/win-ui': '^0.0.3'
      },
      devDependencies
    });
  }

  if (options.language === 'js') {
    if (options.preset === 'v2') {
      api.render('../ui/wui');
    }
  } else {
    if (options.preset === 'v2') {
      api.render('../ui/wui-ts');
    }
  }
  api.injectImports('src/vendor/index.js', `import './wui.js'`);
  api.onCreateComplete(() => {});
};
