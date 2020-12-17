module.exports = (api, options, rootOptions) => {
  const utils = require('./utils')(api);

  // 命令
  api.extendPackage({
    scripts: {
      'bootstrap': 'yarn --registry https://registry.npm.taobao.org || npm install --registry https://registry.npm.taobao.org || cnpm install',
      'serve': 'vue-cli-service serve',
      'lint': 'vue-cli-service lint',
      'lint:style': 'vue-cli-service lint:style',
      'lint:prettier': 'check-prettier lint',
      'report': 'vue-cli-service build --report',
      'new': 'plop',
      'deploy': 'npm run build && npm run zip',
      'prettier': 'node ./scripts/prettier.js',
      'release': 'sh build/release.sh',
      'inspect': 'vue inspect > output.js --verbose',
      'reinstall': 'rimraf node_modules && rimraf yarn.lock && rimraf package.lock.json && npm run bootstrap'
    },
    'scripts-info': {
      'serve': '运行开发服务器',
      'build': '生产环境执行构建',
      'analyz': '生产环境执行构建打包分析',
      'deploy': '生产环境执行构建并压缩zip包',
      'see': '生成 see 平台部署发布物'
    }
  });

  if (options.language === 'ts') {
    api.extendPackage({
      scripts: {
        'build': 'node build/index.ts',
        'zip': 'node build/zip.ts'
      },
      devDependencies: {
        'typescript': '~3.9.3'
      }
    });
  } else {
    api.extendPackage({
      scripts: {
        'build': 'node build/index.js',
        'zip': 'node build/zip.js'
      }
    });
  }

  // 公共依赖包
  api.extendPackage({
    dependencies: {
      '@winner-fed/cloud-utils': '*',
      '@winner-fed/magicless': '*',
      'axios': '0.19.2',
      'normalize.css': '8.0.1'
    },
    devDependencies: {
      '@winner-fed/eslint-config-win': '^1.0.2',
      '@vue/eslint-config-prettier': '^6.0.0',
      '@winner-fed/stylelint-config-win': '^0.1.0',
      '@winner-fed/vue-cli-plugin-eslint': '^1.0.2',
      '@winner-fed/vue-cli-plugin-stylelint': '^1.0.2',
      'add-asset-html-webpack-plugin': '^3.1.3',
      'archiver': '^3.0.0',
      'babel-eslint': '^10.0.1',
      'chalk': '^2.4.1',
      'check-prettier': '^1.0.3',
      'compression-webpack-plugin': '^3.0.0',
      'rimraf': '^3.0.2',
      'eslint': '^7.6.0',
      'plop': '^2.3.0',
      'prettier': '^1.19.1',
      'script-ext-html-webpack-plugin': '^2.1.3',
      'stylelint': '^13.6.1',
      'svn-info': '^1.0.0',
      'tasksfile': '^5.1.0',
      'webpack-manifest-plugin': '^3.0.0',
      'webpackbar': '^4.0.0',
      'webstorm-disable-index': '^1.2.0'
    }
  });

  if (options.language === 'ts') {
    api.extendPackage({
      dependencies: {
        'register-service-worker': '^1.7.1'
      },
      devDependencies: {
        '@types/node': '^10.14.17',
        '@types/webpack-env': '^1.14.0',
        '@typescript-eslint/eslint-plugin': '^2.33.0',
        '@typescript-eslint/parser': '^2.33.0',
        '@vue/cli-plugin-pwa': '~4.5.0',
        '@vue/cli-plugin-typescript': '~4.5.0',
        '@vue/eslint-config-typescript': '^5.0.2'
      }
    });
  }

  // vue preset 版本
  if (options.preset === 'v2') {
    api.extendPackage({
      dependencies: {
        'vue-router': '^3.1.5',
        'vue-svgicon': '3.2.6'
      },
      devDependencies: {
        '@liwb/vue-router-invoke-webpack-plugin': '^0.3.2'
      }
    });

    api.extendPackage({
      scripts: {
        'svg': 'vsvg -s ./src/icons/svg -t ./src/icons/components --ext js --es6'
      }
    });

    if (options.language === 'ts') {
      api.extendPackage({
        dependencies: {
          'vue-class-component': '^7.2.2',
          'vue-property-decorator': '^8.3.0'
        }
      });
    }
  } else { // v3
    // vue3 不需要 vue-template-compiler
    // 因此移除 vue2 及 vue-template-compiler
    // 消除 warning
    api.extendPackage({
        dependencies: {
          'vue': null
        },
        devDependencies: {
          'vue-template-compiler': null
        }
      },
      {
        prune: true
      });

    api.extendPackage({
      dependencies: {
        '@yzfe/svgicon': '^1.0.1',
        '@yzfe/vue3-svgicon': '^1.0.1',
        'vue': '^3.0.0',
        'vue-router': '^4.0.0-0'
      },
      devDependencies: {
        '@vue/compiler-sfc': '^3.0.0',
        '@yzfe/svgicon-loader': '^1.0.1',
        '@yzfe/vue-cli-plugin-svgicon': '~1.0.1'
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

  // 支持see平台发布物
  if(options['see-package']) {
    api.extendPackage({
      scripts: {
        'see': 'npm run build && node build/package/see.js',
      },
      devDependencies: {
        '@winner-fed/winner-deploy': '*',
      }
    })
  }

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
        'light-sdk': '^2.0.4',
        '@winner-fed/native-bridge-methods': '*'
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
  } else if (options['mobile-ui-framework'] === 'vant') {
    require('./vant.js')(api, options);
  }

  if (options.preset === 'v2') {
    if (options.language === 'js') {
      // 公共基础目录和文件
      api.render('./template');
    } else {
      api.render('./ts-template');
    }
  } else {
    if (options.language === 'js') {
      // 公共基础目录和文件
      api.render('./template-v3');
    } else {
      api.render('./ts-template-v3');
    }
  }


  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true;
    if (options['mobile-ui-framework'] === 'none') {
      utils.deleteDir('./src/vendor');
    }
    // 只有离线包才有这个文件
    if (options.application !== 'offline') {
      utils.deleteFile('./offlinePackage.json');
    }
    // 是否为公司内部项目
    if (!options['mirror-source']) {
      utils.deleteFile('./.npmrc');
      utils.deleteFile('./.yarnrc');
    }
    // 是否支持see平台发布物
    if(!options['see-package']) {
      utils.deleteFile('./build/package');
    }
    // PC项目
    if (options['application'] === 'pc') {
      utils.deleteFile('./public/console.js');
      utils.deleteFile('./public/vconsole.min.js');
    }
  });
};
