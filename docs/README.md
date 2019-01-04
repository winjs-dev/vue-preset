# Vue CLI 3 Preset 项目开发小结
## Vue CLI 3 基本认识
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

### @vue/cli-plugin-xxx
插件分为 Service 插件、CLI 插件两类。
#### Service 插件
为 @vue/cli-service 添加特性
* 功能：添加命令、配置（webpack）模块
* 生命周期：每次执行 ```vue-cli-service``` 命令时被调用
* 表现形式：一个默认导出为函数的 javascript 文件
* 上下文：
```js
// 主逻辑（必要）
module.exports = (api, projectOptions) => {
  api.chainWebpack(webpackConfig => {
    // 通过 webpack-chain 修改 webpack 配置
  })

  api.configureWebpack(webpackConfig => {
    // 修改 webpack 配置
    // 或返回通过 webpack-merge 合并的配置对象
  })

  api.registerCommand('my-build', args => {
    // 注册 `vue-cli-service my-build`
  })
}

// 模式限制（可选）
module.exports.defaultModes = {
  'my-build': 'production'
}

// 自定义插件参数（可选）
module.exports = {
  pluginOptions: {}
}
```

#### CLI 插件
为 @vue/cli 添加特性
* 功能：首先包含一个 Service 插件，此外还有 [Generator](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#generator) 和 [Prompt](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6%E7%9A%84%E5%AF%B9%E8%AF%9D)
* 生命周期：如果插件包含在 preset 配置中，则 [Generator](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#generator) 和 [Prompt](https://cli.vuejs.org/zh/dev-guide/plugin-dev.html#%E7%AC%AC%E4%B8%89%E6%96%B9%E6%8F%92%E4%BB%B6%E7%9A%84%E5%AF%B9%E8%AF%9D) 在调用命令 ```vue create``` 时执行，如果插件是独立安装，则两者在调用命令 ```vue invoke``` 时执行。
* 表现形式如下项目结构所示：
```
.
├── README.md
├── generator.js  # generator (可选)
├── prompts.js    # prompt 文件 (可选)
├── index.js      # service 插件
└── package.json
```
* 上下文：
```js
/**
 * Generator 主逻辑
 *
 * @param {Generator} api - GeneratorAPI 实例，可以参考下方的 GeneratorAPI 成员签名
 * @param {object} options - 由 prompts.js 配置的问题返回的答案对象
 * @param {object} rootOptions - 完整的 preset.json
 */
module.exports = (api, options, rootOptions) => {}
```
[GeneratorAPI](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/GeneratorAPI.js)：
```js
/**
 * Resolve path for a project.
 *
 * @param {string} _path - Relative path from project root
 * @return {string} The resolved absolute path.
 */
function resolve (_path) {}

/**
 * Configure how config files are extracted.
 *
 * @param {string} key - Config key in package.json
 * @param {object} options - Options
 * @param {object} options.file - File descriptor
 * Used to search for existing file.
 * Each key is a file type (possible values: ['js', 'json', 'yaml', 'lines']).
 * The value is a list of filenames.
 * Example:
 * {
 *   js: ['.eslintrc.js'],
 *   json: ['.eslintrc.json', '.eslintrc']
 * }
 * By default, the first filename will be used to create the config file.
 */
function addConfigTransform (key, options) {}

/**
 * Extend the package.json of the project.
 * Nested fields are deep-merged unless `{ merge: false }` is passed.
 * Also resolves dependency conflicts between plugins.
 * Tool configuration fields may be extracted into standalone files before
 * files are written to disk.
 *
 * @param {object | () => object} fields - Fields to merge.
 */
function extendPackage (fields) {}

/**
 * Render template files into the virtual files tree object.
 *
 * @param {string | object | FileMiddleware} source -
 *   Can be one of:
 *   - relative path to a directory;
 *   - Object hash of { sourceTemplate: targetFile } mappings;
 *   - a custom file middleware function.
 * @param {object} [additionalData] - additional data available to templates.
 * @param {object} [ejsOptions] - options for ejs.
 */
function render (source, additionalData = {}, ejsOptions = {}) {}

/**
 * Push a file middleware that will be applied after all normal file
 * middelwares have been applied.
 *
 * @param {FileMiddleware} cb
 */
function postProcessFiles (cb) {}

/**
 * Push a callback to be called when the files have been written to disk.
 *
 * @param {function} cb
 */
function onCreateComplete (cb) {}

/**
 * Add a message to be printed when the generator exits (after any other standard messages).
 *
 * @param {} msg String or value to print after the generation is completed
 * @param {('log'|'info'|'done'|'warn'|'error')} [type='log'] Type of message
 */
function exitLog (msg, type = 'log') {}

/**
 * convenience method for generating a js config file from json
 */
function genJSConfig (value) {}

/**
 * Add import statements to a file.
 */
function injectImports (file, imports) {}

/**
 * Add options to the root Vue instance (detected by `new Vue`).
 */
function injectRootOptions (file, options) {}

/**
 * Get the entry file taking into account typescript.
 *
 * @readonly
 */
get entryFile () {}

/**
 * Is the plugin being invoked?
 *
 * @readonly
 */
get invoking () {}
```

### @vue/cli-service-global
官方描述是快速开始零配置原型开发，也就是安装了 @vue/cli + @vue/cli-service-global 之后，vue 命令可以对单个 vue 组建直接提供一下两个命令：
```bash
vue serve xxx.vue
vue build xxx.vue
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

::: tip 提示
由于初始化项目会有繁琐的安装依赖过程，所以推荐在 [@vue/cli 中打断点](https://github.com/vuejs/vue-cli/blob/dev/packages/%40vue/cli/lib/Creator.js#L63)观察整个创建流程。
:::

## 问题记录
### 如何从任意 git 仓库获取 remote preset 初始化项目？
#### 背景
* 截止 2018/10/16 官方文档关于获取远程 preset 说明包含 github、gitlab、bitbucket 三个云仓库；
* 尝试直接在 --preset 后填写完整 url 直接报 404 或 auth 相关错误；
* 添加 --clone 参数后报 'git clone' failed with status 128 错误；
#### 解决方案
```bash
# 关键点：
# 1. 在 git 仓库 url 前添加 "direct:"
# 2. 添加 --clone 参数
vue create --preset direct:https://github.com/cloud-templates/vue-preset.git preset-seed-demo --clone
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
