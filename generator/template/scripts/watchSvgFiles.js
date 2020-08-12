var fs = require('fs')
var path = require('path')
var {exec} = require('child_process')

function debounce (fn, wait = 50) {
  let timer = null
  return function(...args) {
      if (timer) clearTimeout(timer)
      timer = setTimeout(() => {
          fn.apply(this, args)
      }, wait)
  }
}

var buildSvg = debounce(function () {
  exec('npm run svg', function () {
    console.log('添加SVG成功  >.<')
  })
}, 3000)

fs.watch(path.resolve(__dirname, '../src/icons/svg'), function () {
  buildSvg()
})