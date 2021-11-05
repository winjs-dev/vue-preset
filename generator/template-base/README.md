# [vue-template](https://github.com/cklwblove/vue-cli3-template)

基于 vue-cli 搭建的前端模板

## 特性

- CSS 预编译语言：[less](http://lesscss.org/)

- Ajax: [axios](https://github.com/axios/axios)，做了一定的封装，详见 `src/services/request.js`

- SVG 雪碧图：采用 `webpack` 插件 `svg-sprite-loader`,及 `svg` 精简压缩工具 `svgo`

- 移动 web 的适配方案：目前提供了两种方案，`rem` 及 `vw`。分别引入了 `postcss-pxtorem` 及 `amfe-flexible` 和 `postcss-px-to-viewport`，可以自由地用 px 去开发

- 常用的 js 工具类： [cloud-utils](https://cklwblove.github.io/cloud-utils/)

- 常用的 Less 的 mixins 集合：[magicless](https://github.com/cklwblove/magicless)

## 目录介绍
```bash
.
├── build
├── docs
├── plop-templates
├── public
├── scripts
└── src
    ├── assets
    │   ├── fonts
    │   ├── img
    │   └── style
    ├── components
    │   ├── NetworkBroken
    │   ├── SendCode
    │   └── global
    ├── filters
    ├── icons
    │   ├── components
    │   └── svg
    ├── models
    ├── router
    ├── services
    ├── vendor
    └── views
        ├── hello
        └── svgIcons
```

- build - 构建工具（如webpack） 及 node 命令行工具相关配置
   - index.js - 利用 tasksfile 插件，自定义打包构建之后的异常，便于捕获。
   - zip.js - 将构建的 dist 包压缩成 zip 格式。
- public - 目录下的文件不会被构建工具（webpack）处理，构建的包最终是原样输出。而其他的静态资源都会被构建工具（webpack）当做模块处理
- src - 源码目录
   - assets - 静态资源文件，作用于全局
      - fonts - font字体图标，默认是 [iconfont.cn](https://www.iconfont.cn/) 生成的全部文件
      - img - 图片资源文件
      - style - CSS 相关样式文件，`reset` 样式文件及全局定义的 `less` 变量文件，自定义的 `mixins` 函数库，换肤文件等
      - js - 不经过 npm 或 yarn 下载的第三方依赖包。（扩展出来的文件）
   - components - 组件目录，统一采用大驼峰拼接，如 SendCode
   - filters - 过滤器，过滤器是 vue2 的叫法，在 vue3 是不存在的。vue3 可以理解成是函数库
   - icons - 放置 svg 相关的图标。用 [vue-svgicon](https://github.com/MMF-FE/svgicon) 实现。可以作为 iconfont 的替代品，因为 iconfont 只支持单色。项目里推荐使用这种方式。
   - models - 数据生产者。可以按照前端领域模型来组织。项目中的数据来源，主要是后端接口（http协议的接口），及混合式开发时，壳子这边提供的桥接接口。或者是接入的第三方插件提供的数据。
      - 复用，解耦，使用方便。
      - 注释清晰，遵循 jsdoc 的注释规范，利用 `npm scripts`里的 `gen:docs`生成可视化的前端接口文档。
      - 纯前端的 BFF 层，视图和业务逻辑的胶水层。
   - router - 路由及路由拦截器
   - services - 网络请求库的封装。对 http 协议接口做的封装。
      - autoMatchBaseUrl.js - 项目中若存在多个服务端接口的对接，则需要在 config.local.js 里定义多个接口请求路径，此文件就是针对配置不同的 prefix，做自动适配的。可参考下面一段示例： *autoMatchBaseUrl与config.local.js配合使用*
      - pending.js - 在开发中，经常会遇到接口重复请求导致的各种问题。无论从用户体验或者从业务严谨方面来说，取消无用的请求确实是需要避免的。
      - 对于重复的 get 请求，会导致页面更新多次，发生页面抖动的现象，影响用户体验。
      - 对于重复的 post 请求，会导致在服务端生成两次记录（例如生成两条订单记录）。
      - 如果当前页面请求还未响应完成，就切换到了下一个路由，那么这些请求直到响应返回才会中止。
      - request.js - 针对 axios 的封装，主要函数是 request(url, options)、uploadFile(url, formData)
      - RESTFULURL.js - 所有服务端接口的映射表，对应的 value 值不建议添加接口具体的 path，可参考下面一段示例： *RESTFULURL.js* 示例， 如标准的 URL `http://xx.com/v1/func_get_user_info`
          - http 协议路径 [http://xx.com/](http://xx.com/)
          - path 路径：v1/
          - 接口名：`[func_get_user_info](http://xx.com/v1/func_get_user_info)`
          - 因为有时候开发环境和生产环境接口对应 path 会有修改，所以在配置 API_HOME 的时候，尽量是 http 协议路径 + path 路径。

```javascript
// autoMatchBaseUrl与config.local.js配合使用
// config.local.js
window.LOCAL_CONFIG = {
  API_HOME: 'http://api.github.com/',
  CLINET_API_HOME: 'http://client.github.com/',
  MALL_API_HOME: 'http://mall.github.com/'
}

// constant.js
const QUOTE_PREFIX = 'v1/';
const CLIENT_PREFIX = 'client/';
const MALL_PREFIX = 'shop/';
export {
  QUOTE_PREFIX,
  CLIENT_PREFIX,
  MALL_PREFIX
}

// autoMatchBaseUrl.js
export default function autoMatchBaseUrl(prefix) {
  const options = {};
  switch (prefix) {
    case QUOTE_PREFIX:
      options.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
      options.baseUrl = window.LOCAL_CONFIG.QUOTE_HOME + QUOTE_PREFIX;
      break;
    case CLIENT_PREFIX:
      options.data = {
        user_token: store.getters.clientToken
      };
      options.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
      options.baseUrl = window.LOCAL_CONFIG.IFS_API_HOME + CLIENT_PREFIX;
      break;
    case MALL_PREFIX:
      options.data = {
        fansToken: encrypt.encrypt(store.getters.userInfo.fundAccount)
      };
      options.headers = {'Content-Type': 'application/x-www-form-urlencoded'};
      options.baseUrl = window.LOCAL_CONFIG.MALL_API_HOME + MALL_PREFIX;
      break;
    default: // 默认
      options.data = {
        user_token: store.getters.apiToken
      };
      options.headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      };
      options.baseUrl = window.LOCAL_CONFIG.API_HOME + HOME_PREFIX;
  }

  return options;
}
```

```javascript
// RESTFULURL.js
export default {
  ....
  getUserInfo: 'func_get_user_info',
 ...
}
```

   - views - 视图层，数据的消费者。尽可能的让视图层更“轻”。
      - 统一采用小驼峰（切记），如 helloWorld
   - constant.js - 定义常量（大驼峰，单词之间以下划线连接）。编写业务程序时，会有一些所需要的常量值，比如订单状态，1,2,3...。一般情况下，这些值都是固定不变的。如果直接将这些值硬编码到代码里，就可以理解成“魔法值”。魔法值的存在，从语法上来说是合理的，但是从业务上却让人无法理解其中0，1，2，3的含义。对于这些魔法值，我们往往需要通过上下文推断出来逻辑，如果是非常复杂的业务或者10年前的代码那就更惨了，搞不好连文档注释也没有。为了可读性，所以我们要尽量避免出现魔法值。

- index.html - 遵循于 [EJS](https://ejs.co/) 嵌入式 JavaScript 模板引擎语法，比如 `<%% EJS %%>`。可以动态设置并解析所定义的变量，借助于 html-webpack-plugin
   - 配置文件 config.local.js 的引用方式这里做下说明，由于之前生产环境上遇到过，更改配置文件并上传服务器更新后，有缓存的问题，因此用了 `document.write` 方式实现，用于清除此文件的缓存
```javascript
<script>
  document.write(unescape('%3Cscript src=\'./config.local.js?_t=' + Math.random() + '\' type=\'text/javascript\'%3E%3C/script%3E'));
</script>
```

- package.json - 重点关注几个属性就行
   - scripts
```json
  "scripts": {
    # 开发调试，基于 webpack
    "serve": "vue-cli-service serve",
    # 构建打包
    "build": "node build/index.js",
    # .js、.vue、.jsx 文件的编码规范检测，自带修复。基于 @winner-fed/vue-cli-plugin-eslint 实现
    "lint": "vue-cli-service lint",
    # 生成部署包，并且压缩成 zip 包
    "deploy": "npm run build && npm run zip",
    # 初始化安装依赖包
    "bootstrap": "yarn --registry https://registry.npm.taobao.org || npm install --registry https://registry.npm.taobao.org || cnpm install",
    # 开发调试，基于 vite
    "dev": "vite",
    # 针对 dist 包进行 ES6+ 的检测。目标是生成 ES5 的代码
    "escheck": "es-check",
    # 审查项目的 webpack 相关配置
    # 详见 https://cli.vuejs.org/zh/guide/webpack.html#%E4%BF%AE%E6%94%B9%E6%8F%92%E4%BB%B6%E9%80%89%E9%A1%B9
    "inspect": "vue inspect > output.js --verbose",
    # 文件格式化是以 prettier 实现
    "lint:prettier": "check-prettier lint",
    # .css、.less、.sass 等文件的编码规范检测，自带修复。基于 @winner-fed/vue-cli-plugin-stylelint 实现
    "lint:style": "vue-cli-service lint:style",
    # 自定义一些代码片段或者基础模板，自动生成 view 或者 component 等文件，项目初始化的时候，创建视图文件比较方便
    "new": "plop",
    # .js、.vue、.md 等文件格式化，依赖于 prettier
    "prettier": "node ./scripts/prettier.js",
    # 重新安装
    "reinstall": "rimraf node_modules && rimraf yarn.lock && rimraf package.lock.json && npm run bootstrap",
    "release": "sh build/release.sh",
    # 会根据构建统计生成报告，生成的 report.html 文件，它会帮助你分析包中包含的模块们的大小。
    "report": "vue-cli-service build --report",
    # 一键生成 SEE平台发布物
    "see": "npm run build && node build/package/see.js",
    # 一键生成 SVG 图标组件
    "svg": "vsvg -s ./src/icons/svg -t ./src/icons/components --ext js --es6",
    # 将 dist 文件夹，压缩成 zip 包
    "zip": "node build/zip.js",
    # 根据文件夹 models 相关的前端领域模型，生成对应的文档说明
    "gen:docs": "./node_modules/.bin/jsdoc -c jsdoc.json"
  }
```

   - dependencies - 脚手架标配的依赖包如下所示：
```json
"dependencies": {
  "@winner-fed/cloud-utils": "*",
  "@winner-fed/magicless": "*",
  "axios": "0.19.2",
  "core-js": "^3.6.5",
  "amfe-flexible": "0.3.2",
  "normalize.css": "8.0.1",
  "vue": "^2.6.11",
  "vue-router": "3.5.1",
  "vue-svgicon": "3.2.6"
}
```

   - devDependencies
```json
"devDependencies": {
  "@vue/cli-plugin-babel": "~4.5.0",
  "@vue/cli-service": "~4.5.0",
  "@vue/eslint-config-prettier": "^6.0.0",
  "@winner-fed/eslint-config-win": "^1.0.2",
  "@winner-fed/stylelint-config-win": "^0.1.0",
  "@winner-fed/vue-cli-plugin-eslint": "^1.0.2",
  "@winner-fed/vue-cli-plugin-stylelint": "^1.0.2",
  "@winner-fed/vue-router-invoke-webpack-plugin": "^1.0.0",
  "@winner-fed/winner-deploy": "^2.0.0",
  "add-asset-html-webpack-plugin": "^3.1.3",
  "archiver": "^3.0.0",
  "babel-eslint": "^10.0.1",
  "chalk": "^2.4.2",
  "check-prettier": "^1.0.3",
  "compression-webpack-plugin": "^3.0.0",
  "docdash": "^1.2.0",
  "es-check": "^5.2.3",
  "eslint": "^7.6.0",
  "internal-ip": "^4.2.0",
  "less": "^3.0.4",
  "less-loader": "^7.3.0",
  "plop": "^2.3.0",
  "postcss-pxtorem": "^4.0.1",
  "prettier": "^1.19.1",
  "qrcode-terminal": "^0.12.0",
  "rimraf": "^3.0.2",
  "script-ext-html-webpack-plugin": "^2.1.3",
  "stylelint": "^13.6.1",
  "svn-info": "^1.0.0",
  "tasksfile": "^5.1.0",
  "vite": "^2.2.3",
  "vite-plugin-components": "^0.8.4",
  "vite-plugin-html": "^2.0.3",
  "vite-plugin-style-import": "^0.10.0",
  "vite-plugin-vue2": "^1.4.4",
  "vue-cli-plugin-qrcode": "*",
  "vue-template-compiler": "^2.6.11",
  "webpack-manifest-plugin": "^3.0.0",
  "webpackbar": "^4.0.0"
}
```

- .browserslistrc - 是在不同的前端工具之间共用目标浏览器和 node 版本的配置文件。主要用于 Autoprefixer Babel 等，详细可见 [https://juejin.cn/post/6844903669524086797](https://juejin.cn/post/6844903669524086797)
- .editorconfig - 是一套用于统一代码格式的解决方案，可以帮助开发者在不同的编辑器和 IDE 之间定义和维护一致的代码风格。常见的 IDE 如 webstorm,vscode 都可以配置。详见 [http://www.alloyteam.com/2014/12/editor-config/](http://www.alloyteam.com/2014/12/editor-config/)
- .escheckrc - 使用简单的shell命令检查JavaScript文件中使用的 ES 版本。构建的前端包（dist包）需要支持安卓 4.4 及 iOS9.0 机型，所以为了避免包里出现 ES6 语法，增加了新的 npm scripts 命令: escheck。执行完 npm run build 之后，可以使用 npm run escheck 进行检测。
- jsconfig.json - 详见 [https://segmentfault.com/a/1190000018013282](https://segmentfault.com/a/1190000018013282)
- plopfile.js - plop 相关 [https://github.com/plopjs/plop](https://github.com/plopjs/plop)。帮助团队快速创建具有一致性的新文件。
- postcss.config.js - postcss 配置文件，集成了 autoprefixer ，px2rem 等插件
- .prettierrc - prettier 配置文件，用于代码格式化，如 .md,.vue,.js,.jsx,.ts,.tsx,.css,.less,.sass 等文件
- stylelint.config.js - 样式编码规范
- .eslintrc.js - javascript 编码规范
- vue.config.js - vue-cli 的可选配置文件，底层是针对 webpack 进行了封装。脚手架做了一些常用的额外配置
   - [compression-webpack-plugin](https://www.npmjs.com/package/compression-webpack-plugin) - 提供带 Content-Encoding 编码的压缩版的资源。启用静态资源（css,js）的 gz 压缩。
   - [add-asset-html-webpack-plugin](https://www.npmjs.com/package/add-asset-html-webpack-plugin) - 可以针对打包后，通过 script 或 link 标签，在 html 文件中插入特定的 js 或 css 资源引用。
   - [terser-webpack-plugin](https://webpack.docschina.org/plugins/terser-webpack-plugin/) - 由于 uglifyjs 不支持 es6 语法，因此官方推荐使用此插件。该插件使用 terser 来压缩JavaScript。
   - [webpack-manifest-plugin](https://www.npmjs.com/package/webpack-manifest-plugin) - 静态资源的映射表。用于生成静态资源清单的插件，主要是生成 see 包需要此插件生成的 manifest.json，用于上传服务器生成对应的文件路径。

## 开发及发布
```
# 安装依赖
yarn install

# 可以通过如下操作解决 yarn 下载速度慢的问题
yarn install --registry=https://registry.npm.taobao.org

# 启动服务
## vue-cli
yarn run serve
## vite
yarn run dev

# 构建生产环境
yarn run build

# 压缩 dist 文件夹，生成 zip 包
yarn run zip

```

浏览器访问 http://localhost:3000

## 其他
```
# --svgo svg精简压缩
yarn run svgo

# --analyz 基于 webpack-bundle-analyzer 插件分析打包的文件构成及大小
yarn run analyz

# --report 生成静态报告文件
yarn run report

```

## 相关链接

- [vue-cli4官方文档](https://cli.vuejs.org/zh/)
- [vue-cli4.0 配置](https://blog.csdn.net/qq_35844177/article/details/81099492)
- [chainWebpack](https://github.com/neutrinojs/webpack-chain#getting-started)
- [[Vue CLI 4] 配置 webpack-bundle-analyzer 插件](https://segmentfault.com/a/1190000016247872)
