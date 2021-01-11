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
        vant: '^2.8.7'
      },
      devDependencies
    });
  } else {
    api.extendPackage({
      dependencies: {
        vant: '^3.0.0-beta.1'
      },
      devDependencies
    });
  }

  if (options.language === 'js') {
    if (options.preset === 'v2') {
      api.render('../ui/vant');
    } else {
      api.render('../ui/vant-v3');
    }
  } else {
    if (options.preset === 'v2') {
      api.render('../ui/vant-ts');
    } else {
      api.render('../ui/vant-ts-v3');
    }
  }
  api.injectImports('src/vendor/index.js', `import './vant.js'`);
  api.onCreateComplete(() => {});
};
