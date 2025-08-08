# Vue CLI 3 Preset Web 项目骨架开发小结
## Vue CLI 3 基本认识
> [官网文档](https://cli.vuejs.org/zh/guide/)
[参考链接](https://github.com/yuezhilunhui2009/vue-cli3-preset-seed)

### @vue/cli
用于交互式搭建基于 vue 技术栈项目的工具，通常安装在全局 node_module 中。它提供的命令主要有以下几个：
```bash
# 用于创建项目
vue create

# 启动 VUE GUI
vue ui

# 部分 vue [command] 的命令实际是 @vue/cli-service 提供的
vue inspect

# 部分 vue [command] 的命令实际是 @vue/cli-service-global 提供的
vue serve
vue build
```

::: tip 提示
在开发一个 preset 项目时通常关注 ```vue create``` 和 ```vue inspect``` 命令。
:::

### @vue/cli-service
用于本地开发以及编译打包，提供的命令主要是：
```bash
# 本地开发调试
vue-cli-service serve

# 打包编译
vue-cli-service build

# 检查 webpack 最终配置
vue-cli-service inspect

# 代码书写格式检查
vue-cli-service lint
```

## Preset 项目开发
一个 Vue CLI preset 是一个包含创建新项目所需预定义选项和插件的 JSON 对象，让用户无需在命令提示中选择它们。

官方 preset 示例：
```json
{
  "useConfigFiles": true,
  "plugins": {...},
  "router": true,
  "vuex": true,
  "cssPreprocessor": "sass",
  "configs": {
    "vue": {...},
    "postcss": {...},
    "eslintConfig": {...},
    "jest": {...}
  }
}
```

### 使用 preset 初始化项目特点
* 可以预设项目的 vue-plugin-xxx
* 可以预设 router、vuex
* 可以预设 cssPreprocessor
* 可以预设 vue.config.js
* 可以开启或者关闭插件的 prompts
* 可以提供一套文件目录结构
* 可以执行 [Generator](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#generator) 和 [Prompt](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6%E7%9A%84%E5%AF%B9%E8%AF%9D)
* preset 可以是本地或者远程项目

### preset 项目的结构
```
.
├── README.md
├── projectTemplate
├── generator.js  # generator (可选)
├── prompts.js    # prompt 文件 (可选)
├── index.js      # service 插件
└── package.json
```

### preset 项目的调试
通过引用本地 preset 创建项目的方式进行代码调试
```bash
# ./my-preset 应当是一个包含 preset.json 的文件夹
vue create --preset ./my-preset my-project

# 或者，直接使用当前工作目录下的 json 文件：
vue create --preset my-preset.json my-project
```

## 项目特性
- CSS 预编译语言：[less](http://lesscss.org/)

- 移动 web 的适配方案：引入了 `postcss-pxtorem` 及 `amfe-flexible`，可以自由地用 px 去开发

- 常用的 js 工具类： [cloud-utils](https://cklwblove.github.io/cloud-utils/)

- 常用的 Less 的 mixins 集合：[magicless](https://github.com/cklwblove/magicless)

- `stylelint` 工具，使样式文件，如 `less`、`css` 更加规范。这里推崇 `stylelint-config-standard`，[文档传送门](https://github.com/stylelint/stylelint-config-standard) ，结合了 `stylelint-order`，让 **css 属性**展现更加高效。
```js
// stylelint.config.js
{
  root: true,
  processors: [],
  plugins: ['stylelint-order'],
  extends: 'stylelint-config-standard',

  rules: {
    // 允许嵌套的深度最多 3 层
    'max-nesting-depth': 3,
    // 指定声明块内属性的字母顺序
    'order/properties-order': [
      'position',
      'top',
      'right',
      'bottom',
      'left',
      'z-index',
      'display',
      'float',
      'width',
      'height',
      'max-width',
      'max-height',
      'min-width',
      'min-height',
      'padding',
      'padding-top',
      'padding-right',
      'padding-bottom',
      'padding-left',
      'margin',
      'margin-top',
      'margin-right',
      'margin-bottom',
      'margin-left',
      'margin-collapse',
      'margin-top-collapse',
      'margin-right-collapse',
      'margin-bottom-collapse',
      'margin-left-collapse',
      'overflow',
      'overflow-x',
      'overflow-y',
      'clip',
      'clear',
      'font',
      'font-family',
      'font-size',
      'font-smoothing',
      'osx-font-smoothing',
      'font-style',
      'font-weight',
      'hyphens',
      'src',
      'line-height',
      'letter-spacing',
      'word-spacing',
      'color',
      'text-align',
      'text-decoration',
      'text-indent',
      'text-overflow',
      'text-rendering',
      'text-size-adjust',
      'text-shadow',
      'text-transform',
      'word-break',
      'word-wrap',
      'white-space',
      'vertical-align',
      'list-style',
      'list-style-type',
      'list-style-position',
      'list-style-image',
      'pointer-events',
      'cursor',
      'background',
      'background-attachment',
      'background-color',
      'background-image',
      'background-position',
      'background-repeat',
      'background-size',
      'border',
      'border-collapse',
      'border-top',
      'border-right',
      'border-bottom',
      'border-left',
      'border-color',
      'border-image',
      'border-top-color',
      'border-right-color',
      'border-bottom-color',
      'border-left-color',
      'border-spacing',
      'border-style',
      'border-top-style',
      'border-right-style',
      'border-bottom-style',
      'border-left-style',
      'border-width',
      'border-top-width',
      'border-right-width',
      'border-bottom-width',
      'border-left-width',
      'border-radius',
      'border-top-right-radius',
      'border-bottom-right-radius',
      'border-bottom-left-radius',
      'border-top-left-radius',
      'border-radius-topright',
      'border-radius-bottomright',
      'border-radius-bottomleft',
      'border-radius-topleft',
      'content',
      'quotes',
      'outline',
      'outline-offset',
      'opacity',
      'filter',
      'visibility',
      'size',
      'zoom',
      'transform',
      'box-align',
      'box-flex',
      'box-orient',
      'box-pack',
      'box-shadow',
      'box-sizing',
      'table-layout',
      'animation',
      'animation-delay',
      'animation-duration',
      'animation-iteration-count',
      'animation-name',
      'animation-play-state',
      'animation-timing-function',
      'animation-fill-mode',
      'transition',
      'transition-delay',
      'transition-duration',
      'transition-property',
      'transition-timing-function',
      'background-clip',
      'backface-visibility',
      'resize',
      'appearance',
      'user-select',
      'interpolation-mode',
      'direction',
      'marks',
      'page',
      'set-link-source',
      'unicode-bidi',
      'speak'
    ]
  }
```
- `style-resources-loader` 可以为我们的样式文件（css、less、scss、sass、stylus）注入样式资源，统一管理资源文件，如常用的 **变量(variable)，混合函数(mixins)等**。
```js
// vue.config.js
chainWebpack: (config) => {
    // module
    /* config.module.rule('less').oneOf('vue').use('style-resources-loader') */
    config.module
      .rule('less')
      .oneOf('vue')
      .use('style-resources-loader')
      .loader('style-resources-loader')
      .options({
        patterns: [path.resolve(__dirname, 'src/assets/less/variable.less'), path.resolve(__dirname, 'node_modules/magicless/magicless.less')],
        injector: 'prepend'
      }).end();
}
```
- Ajax: [axios](https://github.com/axios/axios)，做了一定的封装，详见 `src/services/request.js`
```js
...
/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param timeout
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @param dataType
 * @returns {Promise.<T>}
 */
export default function request(url, {
  method = 'post',
  timeout = TIMEOUT,
  prefix = HOME_PREFIX,
  data = {},
  headers = {},
  dataType = 'json'
}) {
  const baseURL = autoMatchBaseUrl(prefix);

  headers = Object.assign(method === 'get' ? {
    'Accept': 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  } : {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, headers);

  const defaultConfig = {
    baseURL,
    url,
    method,
    params: data,
    data: data,
    timeout,
    headers,
    responseType: dataType
  };

  if (method === 'get') {
    delete defaultConfig.data;
  } else {
    delete defaultConfig.params;

    const contentType = headers['Content-Type'];

    if (typeof contentType !== 'undefined') {
      if (~contentType.indexOf('multipart')) {
        // 类型 `multipart/form-data;`
        defaultConfig.data = data;
      } else if (~contentType.indexOf('json')) {
        // 类型 `application/json`
        // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
        defaultConfig.data = JSON.stringify(data);
      } else {
        // 类型 `application/x-www-form-urlencoded`
        // 服务器收到的raw body(原始数据) name=homeway&key=nokey
        defaultConfig.data = Qs.stringify(data);
      }
    }
  }

  return axios(defaultConfig);
}
...
```

- SVG 雪碧图：[vue-svgicon](https://github.com/MMF-FE/vue-svgicon)
```js
// src/icons
import Vue from 'vue';
import SvgIcon from 'vue-svgicon';
import './svg-icon.less';
import './components';

Vue.use(SvgIcon, {
  tagName: 'svg-icon',
  defaultWidth: '1em',
  defaultHeight: '1em',
});

```

## 目录介绍

```
.
├── build              # 生成压缩包
├── public             # 静态资源，不需要 webpack 处理
└── src
    ├── assets
    │   ├── fonts      # 字体文件
    │   ├── img
    │   ├── js         # 不经过 npm 或 yarn 下载的第三方依赖包
    │   └── less       # reset 样式，及定义的常量文件等
    ├── components
    │   ├── SendCode   # tree shaking 组件
    │   └── global     # 全局注册组件
    │       └── SvgIcon
    ├── filters        # 全局过滤器
    ├── icons          # svg 文件
    │   └── svg
    ├── router         # 路由及拦截器
    ├── services       # 统一的服务接口请求处理
    └── views
        └── hello

```

## 问题记录
### 如何从任意 git 仓库获取 remote preset 初始化项目？
#### 背景
* 获取远程 preset 说明包含 github、gitlab、bitbucket 三个云仓库；
* 尝试直接在 --preset 后填写完整 url 直接报 404 或 auth 相关错误；
* 添加 --clone 参数后报 'git clone' failed with status 128 错误；
#### 解决方案
```bash
# 关键点：
# 1. 在 git 仓库 url 前添加 "direct:"
# 2. 添加 --clone 参数
vue create --preset direct:https://github.com/cklwblove/vue-preset.git preset-seed-demo --clone
```
#### 解决过程
1. 打开全局 node_modules/@vue/cli 扫一眼目录结构，从 bin 目录找到 vue create --preset 入口；
2. 根据入口代码发现调用链 [bin/vue](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/bin/vue.js) -&gt; [lib/create](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/create.js) -&gt; [lib/Creator](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/Creator.js) -&gt; [util/loadRemotePreset](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/util/loadRemotePreset.js) -&gt; [download-git-repo](https://www.npmjs.com/package/download-git-repo)；

3. 最终看到 vue-cli3 使用了 [download-git-repo](https://www.npmjs.com/package/download-git-repo) 这个 npm 包；
4. 回头看看 vue create --preset &lt;url/gitRepoName&gt; 命令参数的传递过程发现 url 是透传到 [download-git-repo](https://www.npmjs.com/package/download-git-repo) 的；
5. 根据 [download-git-repo](https://www.npmjs.com/package/download-git-repo) 文档我们直接使用 Direct + clone 模式；
6. 反映到 vue create --preset 这边就是 vue create --preset direct:&lt;git url&gt; &lt;projectName&gt; --clone

### preset 项目如何配置 eslint ？
#### 背景
* preset 项目可以在 preset.json 中配置 eslint 插件，例如：@vue/cli-plugin-eslint；
* preset 项目可以在 generator/index.js 中配置 eslint 相关依赖及配置；
* 两种配置是否会冲突，比较晕；
#### 结论
* preset.json 中添加 @vue/cli-plugin-eslint 这个插件带来的是 eslint 整套配置，包含依赖、rule、githook；
* generator/index.js 中配置 eslint 主要通过自己改写 package.json 以及 eslintConfig 内容来配置 eslint，每一处都需要自己写；
* preset.json 与 generator/index.js 的配置可能会产生冲突，例如对 eslintConfig rules 进行配置，如果配置项是数组，那么最终创建的项目里此项会合并两处配置，导致配置错误；

### browserlist 有什么作用，如何正确配置 browserlist ？
#### 背景
* 在使用多种项目脚手架都看到过 browserlist，经常看到这样的默认配置：
```
last 1 version
> 1%
```
#### 结论
* browserlist 作用于以下工具：
    * Autoprefixer
    * Babel
    * postcss-preset-env
    * eslint-plugin-compat
    * stylelint-no-unsupported-browser-features
    * postcss-normalize
* 可以使上面列表中的工具针对特定版本区间的浏览器生成对应的兼容性代码；
* [vue-cli3 中有 @babel/preset-env 和 Autoprefixer 会用到 browserlist 配置](https://cli.vuejs.org/zh/guide/browser-compatibility.html#browserslist)；
* browserlist 配置参考：
    * [https://github.com/browserslist/browserslist](https://github.com/browserslist/browserslist)
* 与 browserlist 配合的工具配置参考：
    * [https://github.com/browserslist/browserslist-example](https://github.com/browserslist/browserslist-example)
* 一个在线工具，用于查看 browserlist 配置文件匹配到哪些浏览器：
    * [https://browserl.ist/?q=defaults](https://browserl.ist/?q=defaults)
* 注意：并不是项目中所有依赖都支持低版本浏览器，例如 vue 本身不支持低于 IE9 的浏览器；

### 如何删除 vue-cli3 创建的默认目录或文件 ？
#### 背景
* 自己编写的 preset 有一套自定义目录结构，但是 vue-cli3 创建项目后总会有一些默认结构：
```
/public
/src/main.js
/src/App.vue
/src/components/HelloWorld.vue
```
#### 结论
* 在 /generator/index.js 中利用 [GeneratorAPI](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/GeneratorAPI.js) 进行目录文件编辑：
```js
// generator
module.exports = (api, options, rootOptions) => {
  // 删除 vue-cli3 默认的 /src 和 /public 目录
  api.render(files => {
    Object.keys(files)
      .filter(path => path.startsWith('src/') || path.startsWith('public/'))
      .forEach(path => delete files[path])
  })

  // 根据自定义模板生成项目结构
  api.render('./template')
}
```

### 如何让 vue-cli3 使用项目模板的 README.md ？
#### 结论
* 在 /generator/index.js 中修改环境变量:
```js
// 屏蔽 generator 之后的文件写入操作
api.onCreateComplete(() => {
    process.env.VUE_CLI_SKIP_WRITE = true
})
```
目的是令 writeFileTree 函数不写文件直接退出，这样 vue-cli3 在写 README.md 时会直接跳过。

### preset 项目如何将配置保存成单个文件，而不是包含在 package.json ？
#### 结论
* 在 preset.json 中修改变量：
```bash
useConfigFiles: true
```
