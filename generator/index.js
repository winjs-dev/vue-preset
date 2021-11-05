module.exports = (api, options, rootOptions) => {
  // 是否需要 vite 作为开发调试工具
  const isNeedVite = options['build-tools'];

  // 小程序
  if (options.preset === 'mini') {
    api.extendPackage(
      {
        scripts: {
          serve: null,
          build: null
        },
        dependencies: {
          vue: null
        },
        devDependencies: {
          '@vue/cli-plugin-babel': null,
          'vue-cli-plugin-qrcode': null,
          '@vue/cli-service': null,
          chalk: null,
          'internal-ip': null,
          less: null,
          'less-loader': null,
          'qrcode-terminal': null
        }
      },
      {
        prune: true
      }
    );

    api.extendPackage({
      name: 'miniprogram',
      version: '1.0.0',
      private: true,
      description: 'mini program app',
      templateInfo: {
        name: 'taro-ui-vue',
        typescript: true,
        css: 'sass'
      },
      scripts: {
        'build:weapp': 'taro build --type weapp',
        'build:swan': 'taro build --type swan',
        'build:alipay': 'taro build --type alipay',
        'build:tt': 'taro build --type tt',
        'build:h5': 'taro build --type h5',
        'build:rn': 'taro build --type rn',
        'build:qq': 'taro build --type qq',
        'build:jd': 'taro build --type jd',
        'build:quickapp': 'taro build --type quickapp',
        'dev:weapp': 'npm run build:weapp -- --watch',
        'dev:swan': 'npm run build:swan -- --watch',
        'dev:alipay': 'npm run build:alipay -- --watch',
        'dev:tt': 'npm run build:tt -- --watch',
        'dev:h5': 'npm run build:h5 -- --watch',
        'dev:rn': 'npm run build:rn -- --watch',
        'dev:qq': 'npm run build:qq -- --watch',
        'dev:jd': 'npm run build:jd -- --watch',
        'dev:quickapp': 'npm run build:quickapp -- --watch'
      },
      browserslist: ['last 3 versions', 'Android >= 4.1', 'ios >= 8'],
      author: 'winner-fed',
      dependencies: {
        '@babel/runtime': '^7.7.7',
        '@tarojs/cli': '3.1.4',
        '@tarojs/components': '3.1.4',
        '@tarojs/runtime': '3.1.4',
        '@tarojs/taro': '3.1.4',
        lodash: '4.17.15',
        'vue-template-compiler': '^2.5.0',
        vue: '^2.5.0',
        'taro-ui-vue': '^1.0.0-alpha.5'
      },
      devDependencies: {
        '@babel/core': '^7.8.0',
        '@tarojs/mini-runner': '3.1.4',
        '@tarojs/webpack-runner': '3.1.4',
        '@types/webpack-env': '^1.13.6',
        'babel-preset-taro': '3.1.4',
        eslint: '^6.8.0',
        'vue-loader': '^15.9.2',
        'eslint-plugin-vue': '^7.x',
        'eslint-config-taro': '3.1.4',
        stylelint: '9.3.0',
        '@typescript-eslint/parser': '^2.x',
        '@typescript-eslint/eslint-plugin': '^2.x',
        typescript: '^3.7.0'
      }
    });

    // 删除 vue-cli3 默认目录
    api.render((files) => {
      Object.keys(files)
        .filter((path) => path.startsWith('src/') || path.startsWith('public/'))
        .forEach((path) => delete files[path]);
    });

    api.render('./miniprogram');
    // 屏蔽 generator 之后的文件写入操作
    // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
    api.onCreateComplete(() => {
      process.env.VUE_CLI_SKIP_WRITE = true;
    });
    return;
  }

  // 版本控制工具
  // svn or git
  if (options['version-control'] === 'git') {
    api.extendPackage({
      scripts: {
        'gen:log': 'conventional-changelog -p angular -i CHANGELOG.md -s -r 0',
        'lint:ls-lint': 'ls-lint',
        'lint:lint-staged': 'lint-staged -c ./.husky/lintstagedrc.js',
        'install:husky': 'is-ci || husky install',
        'lint:pretty': 'pretty-quick --staged'
      },
      devDependencies: {
        '@commitlint/cli': '^13.1.0',
        '@commitlint/config-conventional': '^13.1.0',
        '@ls-lint/ls-lint': '^1.9.2',
        'commitizen': '^4.2.3',
        'conventional-changelog-cli': '^2.1.1',
        'husky': '^7.0.1',
        'is-ci': '^2.0.0',
        'lint-staged': '^10.5.4'
      }
    });
  }

  // 命令
  api.extendPackage({
    scripts: {
      bootstrap:
        'yarn --registry https://registry.npm.taobao.org || npm install --registry https://registry.npm.taobao.org || cnpm install',
      build: 'node build/index.js',
      serve: 'vue-cli-service serve',
      lint: 'vue-cli-service lint',
      'lint:style': 'vue-cli-service lint:style',
      'lint:prettier': 'check-prettier lint',
      report: 'vue-cli-service build --report',
      new: 'plop',
      deploy: 'npm run build && npm run zip',
      prettier: 'node ./scripts/prettier.js',
      release: 'sh build/release.sh',
      inspect: 'vue inspect > output.js --verbose',
      reinstall: 'rimraf node_modules && rimraf yarn.lock && rimraf package.lock.json && npm run bootstrap',
      escheck: 'es-check',
      zip: 'node build/zip.js',
      postinstall: 'node ./tools/init.js'
    },
    'scripts-info': {
      serve: '运行开发服务器',
      build: '生产环境执行构建',
      analyz: '生产环境执行构建打包分析',
      deploy: '生产环境执行构建并压缩zip包',
      see: '生成 see 平台部署发布物',
      escheck: '检测是否含有 ES6+ 语法'
    }
  });

  // 公共依赖包
  api.extendPackage({
    dependencies: {
      '@winner-fed/cloud-utils': '*',
      '@winner-fed/magicless': '*',
      axios: '^0.23.0',
      'normalize.css': '8.0.1'
    },
    devDependencies: {
      '@babel/eslint-parser': '^7.14.9',
      '@winner-fed/eslint-config-win': '^1.0.2',
      '@vue/eslint-config-prettier': '^6.0.0',
      '@winner-fed/stylelint-config-win': '^0.1.0',
      '@winner-fed/vue-cli-plugin-eslint': '^1.0.2',
      '@winner-fed/vue-cli-plugin-stylelint': '^1.0.2',
      'add-asset-html-webpack-plugin': '^3.1.3',
      archiver: '^3.0.0',
      chalk: '^2.4.1',
      'check-prettier': '^1.0.3',
      'compression-webpack-plugin': '^3.0.0',
      'less-loader': '^7.3.0',
      rimraf: '^3.0.2',
      'es-check': '^5.2.3',
      'eslint': '^7.24.0',
      'eslint-plugin-vue': '^7.13.0',
      plop: '^2.3.0',
      prettier: '^2.3.2',
      'pretty-quick': '^3.1.0',
      'script-ext-html-webpack-plugin': '^2.1.3',
      stylelint: '^13.6.1',
      'svn-info': '^1.0.0',
      tasksfile: '^5.1.0',
      'webpack-manifest-plugin': '^3.0.0',
      webpackbar: '^4.0.0'
    }
  });

  if (options.language === 'ts') {
    api.extendPackage({
      dependencies: {
        'register-service-worker': '1.7.2'
      },
      devDependencies: {
        '@types/node': '^10.14.17',
        '@types/webpack-env': '^1.14.0',
        '@typescript-eslint/eslint-plugin': '^4.28.0',
        '@typescript-eslint/parser': '^4.28.0',
        '@vue/cli-plugin-pwa': '~4.5.0',
        '@vue/cli-plugin-typescript': '~4.5.0',
        '@vue/eslint-config-typescript': '^5.0.2',
        typescript: '4.3.5'
      }
    });
  }

  // vue preset 版本
  if (options.preset === 'v2') {
    // vue2
    if (isNeedVite) {
      api.extendPackage({
        scripts: {
          dev: 'vite'
        }
      });
    }

    api.extendPackage({
      dependencies: {
        'vue-router': '3.5.1',
        'vue-svgicon': '3.2.6'
      },
      devDependencies: {
        '@winner-fed/vue-router-invoke-webpack-plugin': '^1.0.0'
      }
    });

    api.extendPackage({
      scripts: {
        svg: 'vsvg -s ./src/icons/svg -t ./src/icons/components --ext js --es6'
      }
    });

    if (options.language === 'ts') {
      api.extendPackage({
        dependencies: {
          'vue-class-component': '7.2.6',
          'vue-property-decorator': '9.1.2'
        }
      });
      // vue2 ts
      if (isNeedVite) {
        api.extendPackage({
          scripts: {
            dev: 'tsc --noEmit && vite'
          }
        });
      }
    }
  } else {
    // v3
    // vue3 不需要 vue-template-compiler
    // 因此移除 vue2 及 vue-template-compiler
    // 消除 warning
    api.extendPackage(
      {
        dependencies: {
          vue: null
        },
        devDependencies: {
          'vue-template-compiler': null
        }
      },
      {
        prune: true
      }
    );

    api.extendPackage({
      dependencies: {
        '@yzfe/svgicon': '1.0.1',
        '@yzfe/vue3-svgicon': '1.0.1',
        vue: '^3.0.5',
        'vue-router': '^4.0.3'
      },
      devDependencies: {
        '@vue/compiler-sfc': '^3.0.0',
        '@winner-fed/svgicon-loader': '^1.0.0'
      }
    });
  }

  // postcss
  // pc
  api.extendPackage({
    postcss: {
      plugins: {
        autoprefixer: {
          overrideBrowserslist: [
            'Android 4.4',
            'iOS 9.0',
            'Chrome > 43',
            'ff > 34',
            'ie >= 10'
          ]
        }
      }
    }
  });

  // 支持see平台发布物
  if (options['see-package']) {
    api.extendPackage({
      scripts: {
        see: 'npm run build && node build/package/see.js'
      },
      devDependencies: {
        '@winner-fed/winner-deploy': '^2.0.0'
      }
    });
  }

  // application 应用类型为 mobile
  if (options.application === 'mobile' || options.application === 'offline') {
    api.extendPackage({
      postcss: {
        plugins: {
          autoprefixer: {
            overrideBrowserslist: [
              'Android 4.4',
              'iOS 9.0',
              'Chrome > 43',
              'ff > 34',
              'ie >= 10'
            ]
          }
        }
      }
    });
    // 移动端适配方案
    if (options['layout-adapter'] === 'vw') {
      api.extendPackage({
        devDependencies: {
          'postcss-px-to-viewport': '^1.1.1'
        },
        postcss: {
          plugins: {
            'postcss-px-to-viewport': {
              unitToConvert: 'px', // 要转化的单位
              viewportWidth: 375, // UI设计稿的宽度
              unitPrecision: 6, // 转换后的精度，即小数点位数
              propList: [
                'height',
                'line-height',
                'width',
                'padding*',
                'margin*',
                'top',
                'left',
                'right',
                'bottom',
                'border*'
              ], // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
              viewportUnit: 'vw', // 指定需要转换成的视窗单位，默认vw
              fontViewportUnit: 'vw', // 指定字体需要转换成的视窗单位，默认vw
              selectorBlackList: ['wrap', '.ignore-', '.hairlines'], // 指定不转换为视窗单位的类名，
              minPixelValue: 1, // 默认值1，小于或等于1px则不进行转换
              mediaQuery: true, // 是否在媒体查询的css代码中也进行转换，默认false
              replace: true, // 是否转换后直接更换属性值
              exclude: [/node_modules/], // 设置忽略文件，用正则做目录名匹配
              landscape: false, // 是否处理横屏情况,是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
              landscapeUnit: 'vw', //横屏时使用的单位
              landscapeWidth: 1134 //横屏时使用的视口宽度
            }
          }
        }
      });
    } else {
      api.extendPackage({
        dependencies: {
          'amfe-flexible': '2.2.1'
        },
        devDependencies: {
          'postcss-pxtorem': '^4.0.1'
        },
        postcss: {
          plugins: {
            'postcss-pxtorem': {
              rootValue: 37.5,
              unitPrecision: 2,
              propList: [
                'height',
                'line-height',
                'width',
                'padding',
                'margin',
                'top',
                'left',
                'right',
                'bottom'
              ],
              selectorBlackList: [],
              replace: true,
              mediaQuery: false,
              minPixelValue: 1
            }
          }
        }
      });
    }
  }

  // application 应用类型为 H5离线包
  if (options.application === 'offline') {
    api.extendPackage({
      dependencies: {
        'light-sdk': '^2.0.4',
        '@winner-fed/native-bridge-methods': '*'
      }
    });
  }

  // 是否需要 vite
  if (isNeedVite) {
    api.extendPackage({
      devDependencies: {
        vite: '^2.2.3',
        'vite-plugin-components': '^0.8.4',
        'vite-plugin-html': '^2.0.3',
        'vite-plugin-style-import': '^0.10.0',
        'vite-plugin-vue2': '^1.4.4'
      }
    });
  }
  // 删除 vue-cli3 默认目录
  api.render((files) => {
    Object.keys(files)
      .filter((path) => path.startsWith('src/') || path.startsWith('public/'))
      .forEach((path) => delete files[path]);
  });

  if (options['ui-framework'] === 'element-ui') {
    require('./element.js')(api, options);
  } else if (options['ui-framework'] === 'iview') {
    require('./iview.js')(api, options);
  } else if (options['ui-framework'] === 'ant') {
    require('./ant.js')(api, options);
  } else if (options['ui-framework'] === 'hui') {
    require('./hui.js')(api, options);
  } else if (options['mobile-ui-framework'] === 'vant') {
    require('./vant.js')(api, options);
  } else if (options['mobile-ui-framework'] === 'wui') {
    require('./wui.js')(api, options);
  }

  // 创建模板
  // 基础模板
  api.render('./template-base', options);
  if (options.preset === 'v2') {
    if (options.language === 'js') {
      if (isNeedVite) {
        api.render('./template-vue2-vite');
      } else {
        api.render('./template-vue2');
      }
    } else {
      api.render('./template-vue2-ts');
    }
  } else {
    if (options.language === 'js') {
      api.render('./template-vue3');
    } else {
      api.render('./template-vue3-ts');
    }
  }

  api.postProcessFiles((files) => {
    Object.keys(files).forEach((name) => {
      // 只有离线包才有这个文件
      if (options.application !== 'offline') {
        delete files['offlinePackage.json'];
      }

      // 版本控制工具 git
      if (options['version-control'] !== 'git') {
        if (/^\.husky[/$]/.test(name)) {
          delete files[name];
        }
        delete files['.ls-lint.yml'];
        delete files['commitlint.config.js'];
      }

      // 是否为公司内部项目
      if (!options['mirror-source']) {
        delete files['.npmrc'];
        delete files['.yarnrc'];
      }

      // 是否支持see平台发布物
      if (!options['mirror-source'] || !options['see-package']) {
        // 删除 build/package 文件夹
        if (/^build\/package[/$]/.test(name)) {
          delete files[name];
        }
      }
      // PC项目
      if (options['application'] === 'pc') {
        delete files['public/console.js'];
        delete files['public/vconsole.min.js'];
      }

      // vite
      if (isNeedVite) {
        delete files['public/index.html'];
      } else {
        delete files['index.html'];
        delete files['vite.config.js'];
      }

      // v3
      if (options.preset === 'v3') {
        delete files['vite.config.js'];
      }
    });
  });

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
  });
};
