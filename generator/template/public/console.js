// 移动端调试工具
if (window.LOCAL_CONFIG.IS_OPEN_VCONSOLE) {
  document.write('<script src="./vconsole.min.js"' + '>' + '<' + '/' + 'script>');
  var str = 'var vconsole = new VConsole(); vconsole.setOption({maxLogNumber: 5000}); console.log(\'当前 url\', window.location.href);';
  document.write('<script type="text/javascript"' + '>' + str + '<' + '/' + 'script>');
}
