'use strict';

const fs = require('fs');
const path = require('path');
const {sh, cli} = require('tasksfile');
const chalk = require('chalk');
const rawArgv = process.argv.slice(2);
const args = rawArgv.join(' ');

const resolve = (dir) => {
  return path.join(__dirname, '../', dir);
};

// 便于捕捉 build 之后的错误，然后进行自定义处理
// 配合 jenkins 执行 job
function command() {
  sh(`vue-cli-service build ${args}`, {
    async: true,
    stdio: 'inherit'
  })
    .then((output) => {
    <%_ if (options.application === 'offline') { _%>
        // 离线包的说明信息
      fs.createReadStream(resolve(`offlinePackage.json`))
        .pipe(fs.createWriteStream(resolve('dist/offlinePackage.json')));
    <%_ } _%>
      console.log(chalk.cyan(output || ''));
    })
    .catch((err) => {
      console.error('\n');
      console.error(chalk.magenta('编译打包出错了 ~~~~(>_<)~~~~ \n'));
      console.error(chalk.magenta('具体错误信息如下 \n'));
      console.error(chalk.red(`${err}.\n`));
      console.log(chalk.red('  Build failed with errors.\n'));
      process.exit(1);
    });
}

command();
