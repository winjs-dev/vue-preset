module.exports = (api, options, rootOptions) => {
  const utils = require('./utils')(api);

  // 开发语言选择
  // JavaScript
  if (options.language === 'js') {
    // 命令
    api.extendPackage({
      scripts: {
        'bootstrap': 'yarn --registry https://registry.npm.taobao.org || npm install --registry https://registry.npm.taobao.org || cnpm install',
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
        'release': 'sh build/release.sh',
        'inspect': 'vue inspect > output.js --verbose'
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
        'axios': '0.19.1',
        'magicless': '*',
        'normalize.css': '8.0.1',
        'vue': '2.6.11',
        'vue-router': '3.1.5',
        'vue-svgicon': '3.2.6'
      },
      devDependencies: {
        '@ascendancyy/vue-cli-plugin-stylelint': '^1.1.2',
        '@liwb/vue-router-invoke-webpack-plugin': '^0.3.2',
        '@vue/cli-plugin-eslint': '^4.1.0',
        '@vue/eslint-config-prettier': '^6.0.0',
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
        'stylelint': '^10.1.0',
        'stylelint-config-standard': '^18.2.0',
        'stylelint-order': '^3.0.0',
        'svn-info': '^1.0.0',
        'tasksfile': '^5.1.0',
        'vue-template-compiler': '^2.6.10',
        'webstorm-disable-index': '^1.2.0'
      }
    });
  } else {
    // 命令
    api.extendPackage({
      scripts: {
        'bootstrap': 'yarn --registry https://registry.npm.taobao.org || npm install --registry https://registry.npm.taobao.org || cnpm install',
        'serve': 'vue-cli-service serve',
        'build': 'node build/index.ts',
        'zip': 'node build/zip.ts',
        'lint': 'vue-cli-service lint',
        'lint:style': 'vue-cli-service lint:style',
        'lint:prettier': 'check-prettier lint',
        'analyz': 'vue-cli-service build --mode analyz',
        'report': 'vue-cli-service build --report',
        'svg': 'vsvg -s ./src/icons/svg -t ./src/icons/components --ext js --es6',
        'new': 'plop',
        'deploy': 'npm run build && npm run zip',
        'prettier': 'node ./scripts/prettier.js',
        'release': 'sh build/release.sh',
        'inspect': 'vue inspect > output.js --verbose'
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
        'axios': '^0.19.1',
        'magicless': '*',
        'normalize.css': '^8.0.1',
        'register-service-worker': '^1.6.2',
        'vue': '^2.6.10',
        'vue-class-component': '^7.2.2',
        'vue-property-decorator': '^8.3.0',
        'vue-router': '^3.1.3',
        'vue-svgicon': '^3.2.6'
      },
      devDependencies: {
        '@ascendancyy/vue-cli-plugin-stylelint': '^1.1.2',
        '@types/node': '^10.14.17',
        '@types/webpack-env': '^1.14.0',
        '@typescript-eslint/eslint-plugin': '^2.18.0',
        '@typescript-eslint/parser': '^2.18.0',
        '@vue/cli-plugin-eslint': '^4.2.0',
        '@vue/cli-plugin-pwa': '^4.2.0',
        '@vue/cli-plugin-router': '^4.2.0',
        '@vue/cli-plugin-typescript': '^4.2.0',
        '@vue/cli-service': '^4.2.0',
        '@vue/eslint-config-prettier': '^6.0.0',
        '@vue/eslint-config-typescript': '^5.0.1',
        'add-asset-html-webpack-plugin': '^3.1.3',
        'archiver': '^3.0.0',
        'chalk': '^2.4.1',
        'check-prettier': '^1.0.3',
        'compression-webpack-plugin': '^3.0.0',
        'eslint': '^6.7.2',
        'eslint-plugin-prettier': '^3.1.1',
        'eslint-plugin-vue': '^6.1.2',
        'prettier': '^1.19.1',
        'progress-bar-webpack-plugin': '^1.12.1',
        'script-ext-html-webpack-plugin': '^2.1.3',
        'stylelint': '^10.1.0',
        'stylelint-config-standard': '^18.2.0',
        'stylelint-order': '^3.0.0',
        'svn-info': '^1.0.0',
        'tasksfile': '^5.1.0',
        'typescript': '~3.7.5',
        'vue-template-compiler': '^2.6.10',
        'webstorm-disable-index': '^1.2.0'
      }
    });
  }

  // postcss
  api.extendPackage({
    postcss: {
      plugins: {
        autoprefixer: {}
      }
    }
  });

  // application 应用类型为 mobile
  if (options.application === 'mobile' || options.application === 'offline') {
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
            unitPrecision: 2,
            propList: ['height', 'line-height', 'width', 'padding', 'margin', 'top', 'left', 'right', 'bottom', 'font-size'],
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

  if (options.language === 'js') {
    // 公共基础目录和文件
    api.render('./template');
  } else {
    api.render('./ts-template');
  }

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
    if (options.application === 'mobile') {
      utils.deleteDir('./src/vendor');
    }
  });
};
