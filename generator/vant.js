module.exports = (api, options, rootOptions) => {
  let devDependencies = {};
  if (options.language === 'js') {
    devDependencies = {
      'babel-plugin-import': '^1.13.0'
    }
  } else {
    devDependencies = {
      'ts-import-plugin': '^1.6.6'
    }
  }

  api.extendPackage({
    dependencies: {
      vant: '^2.8.7'
    },
    devDependencies
  });
  api.render('../ui/vant');
  if (options.language === 'js') {
    api.injectImports('src/vendor/index.js', `import './vant.js'`);
  } else {
    api.injectImports('src/vendor/index.js', `import './vant.ts'`);
  }
  api.onCreateComplete(() => {
  });
};
