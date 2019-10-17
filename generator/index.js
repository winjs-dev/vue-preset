module.exports = (api, options, rootOptions) => {
  const utils = require('./utils')(api);
  // 命令
  api.extendPackage({
    scripts: {
      'serve': 'vue-cli-service serve',
      'build': 'node build/index.js',
      'zip': 'node build/zip.js',
      'lint': 'vue-cli-service lint',
      'lint:style': 'vue-cli-service lint:style',
      'lint:prettier': 'check-prettier lint',
      'analyz': 'vue-cli-service build --mode analyz',
      'report': 'vue-cli-service build --report',
      'svg': 'vsvg -s ./src/icons/svg -t ./src/icons/components --ext js --es6',
      'new': 'plop',
      'deploy': 'npm run build && npm run zip',
      'prettier': 'node ./scripts/prettier.js',
      'release': 'sh build/release.sh'
    },
    'scripts-info': {
      'serve': '运行开发服务器',
      'build': '生产环境执行构建',
      'analyz': '生产环境执行构建打包分析',
      'deploy': '生产环境执行构建并压缩zip包'
    }
  });

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      '@liwb/cloud-utils': '*',
      'axios': '^0.19.0',
      'magicless': '*',
      'normalize.css': '^8.0.1',
      'vue': '^2.6.10',
      'vue-router': '^3.0.1',
      'vue-svgicon': '^3.2.2'
    },
    devDependencies: {
      '@ascendancyy/vue-cli-plugin-stylelint': '^1.1.2',
      '@liwb/vue-router-invoke-webpack-plugin': '^0.3.2',
      '@vue/eslint-config-prettier': '^4.0.1',
      'add-asset-html-webpack-plugin': '^3.1.3',
      'archiver': '^3.0.0',
      'babel-eslint': '^10.0.1',
      'chalk': '^2.4.1',
      'check-prettier': '^1.0.3',
      'compression-webpack-plugin': '^3.0.0',
      'eslint': '^5.8.0',
      'eslint-plugin-vue': '^5.0.0',
      'eslint-plugin-prettier': '^3.1.0',
      'plop': '^2.3.0',
      'prettier': '^1.18.2',
      'progress-bar-webpack-plugin': '^1.12.1',
      'script-ext-html-webpack-plugin': '^2.1.3',
      'style-resources-loader': '^1.2.1',
      'stylelint': '^10.1.0',
      'stylelint-config-standard': '^18.2.0',
      'stylelint-order': '^3.0.0',
      'tasksfile': '^5.1.0',
      'vue-template-compiler': '^2.6.10',
      'webstorm-disable-index': '^1.2.0'
    }
  });

  // postcss
  api.extendPackage({
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    }
  });

  // application 应用类型为 mobile
  if (options.application === 'mobile') {
    api.extendPackage({
      dependencies: {
        'lib-flexible': '^0.3.2'
      },
      devDependencies: {
        'postcss-pxtorem': '^4.0.1'
      },
      postcss: {
        plugins: {
          'postcss-pxtorem': {
            rootValue: 37.5,
            unitPrecision: 5,
            propList: ['height', 'width', 'padding', 'margin', 'top', 'left', 'right', 'bottom'],
            selectorBlackList: [],
            replace: true,
            mediaQuery: false,
            minPixelValue: 1
          }
        }
      }
    });
  }

  // application 应用类型为 H5离线包
  if (options.application === 'offline') {
    api.extendPackage({
      dependencies: {
        'light-sdk': '^1.0.61',
        'native-bridge-methods': '*'
      }
    });
  }

  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path]);
  });

  if (options['ui-framework'] === 'element-ui') {
    require('./element.js')(api, options);
  } else if (options['ui-framework'] === 'iview') {
    require('./iview.js')(api, options);
  } else if (options['ui-framework'] === 'ant') {
    require('./ant.js')(api, options);
  } else if (options['ui-framework'] === 'hui') {
    require('./hui.js')(api, options);
  }

  // 公共基础目录和文件
  api.render('./template');

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
    if (options.application === 'mobile') {
      utils.deleteDir('./src/vendor');
    }
  });
};
