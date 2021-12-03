[![Gitpod ready-to-code](https://img.shields.io/badge/Gitpod-ready--to--code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/cloud-templates/vue-preset)

# vue-preset
结合 vue-cli4.x 的 preset 搭建基于 git repo 的前端项目模板。**支持Vue3.0特性**

## 快速开始

```bash
# 安装 vue-cli 4.0
npm install -g @vue/cli

# 根据远程 preset 创建项目
vue create --preset cloud-templates/vue-preset my-project
# or
vue create --preset direct:https://github.com/cloud-templates/vue-preset.git my-project --clone

# 本地预览
cd my-project && yarn run serve

```

## 文档
```bash
# 本地预览
npm run docs:dev

# 构建部署版本
npm run docs:build
```
## 待办
- [ ] 新增**多页**模板
- [x] 支持 REST 接口规范，可以参考 [restful](https://github.com/cklwblove/vue-preset/blob/ece3b851d947ec00d42815919ca32bb1e84be1b3/generator/template/src/services/request.js#L136)
- [x] axios retry 特性，可以参考 [axios-retry](https://github.com/cklwblove/vue-preset/blob/axios-retry/generator/template/src/services/request.js)
- [x] axios cancel request
- [x] 引入 vant-ui
- [x] 新增**TS**模板
- [x] 新增离线包相关特性
- [x] 支持vue3.0
- [x] vue2.x 支持新的构建工具 vite

## 统计
![Alt](https://repobeats.axiom.co/api/embed/180b11b920e072bf5bdde5581431de24bc1bbf90.svg "Repobeats analytics image")
