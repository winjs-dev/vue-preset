module.exports = (api, options, rootOptions) => {
  // 命令
  api.extendPackage({
    scripts: {
      "serve": "vue-cli-service serve",
      "build": "node build/index.js",
      "lint": "vue-cli-service lint",
      "lint:style": "vue-cli-service lint:style",
      "analyz": "vue-cli-service build --mode analyz",
      "report": "npm_config_generate_report=true npm run build",
      "svg": "vsvg -s ./src/icons/svg -t ./src/icons/components --ext js --es6",
      "deploy": "npm run build && node build/zip.js",
      "release": "sh build/release.sh"
    },
    "scripts-info": {
      "serve": "运行开发服务器",
      "build": "生产环境执行构建",
      "analyz": "生产环境执行构建打包分析",
      "deploy": "生产环境执行构建并压缩zip包"
    }
  })

  // 安装一些基础公共库
  api.extendPackage({
    dependencies: {
      "@liwb/cloud-utils": "*",
      "axios": "^0.18.0",
      "lib-flexible": "^0.3.2",
      "magicless": "*",
      "normalize.css": "^7.0.0",
      "vue": "^2.5.17",
      "vue-router": "^3.0.1",
      "vue-svgicon": "^3.2.2"
    },
    devDependencies: {
      "@ascendancyy/vue-cli-plugin-stylelint": "^1.1.2",
      "archiver": "^2.1.1",
      "chalk": "^2.4.1",
      "compression-webpack-plugin": "^2.0.0",
      "eslint": "^5.8.0",
      "eslint-plugin-vue": "^5.0.0-0",
      "html-webpack-include-assets-plugin": "^1.0.6",
      "postcss-pxtorem": "^4.0.1",
      "runjs": "^4.3.2",
      "script-ext-html-webpack-plugin": "^2.1.3",
      "style-resources-loader": "^1.2.1",
      "stylelint": "^9.10.1",
      "stylelint-config-standard": "^18.2.0",
      "stylelint-order": "^2.1.0",
      "vue-template-compiler": "^2.5.17",
      "webpack-bundle-analyzer": "^3.0.3",
      "webstorm-disable-index": "^1.2.0"
    }
  })

  // postcss
  api.extendPackage({
    postcss: {
      plugins: {
        autoprefixer: {},
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
  })

  // 删除 vue-cli3 默认目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  // 公共基础目录和文件
  api.render('./template')

  // 屏蔽 generator 之后的文件写入操作
  // writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过
  api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
  })
}
