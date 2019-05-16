# vue-preset
结合 vue-cli3 的 preset 搭建基于 git repo 的前端项目模板

**注意：此模板不做维护，请移步[传送门](https://github.com/cklwblove/vue-preset)**

## 快速开始

```bash
# 安装 vue-cli 3.0
npm install -g @vue/cli

# 根据远程 preset 创建项目
vue create --preset cklwblove/vue-preset my-project
# or
vue create --preset direct:https://github.com/cklwblove/vue-preset.git my-project --clone

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
