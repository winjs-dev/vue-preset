module.exports = {
  base: '/vue-preset/',
  serviceWorker: true,
  title: 'vue-preset 说明文档',
  head: [
    ['link', { rel: 'icon', href: './favicon.ico' }]
  ],
  themeConfig: {
    sidebar: 'auto',
    repo: 'https://github.com/cklwblove/vue-preset',
    docsDir: 'docs',
    serviceWorker: {
      updatePopup: true
    }
  }
}
