'use strict';
const fs = require('fs-extra');
const chalk = require('chalk');
const path = require('path');
const { formatDate, generateGUID } = require('@winner-fed/cloud-utils');
const { name, version, buildVersion, description = '发布物描述测试' } = require('../package.json');
const runtimeArgs = process.argv.slice(2);
// 构建 docker 容器化发布物
// windows 不区分大小写
// npm run build:see -dockerSeePack
const isDocker = process.env.npm_config_dockerseepack === 'true';

// 判断是否是 git
exports.isGitSync = function isGitSync(dir) {
  return fs.existsSync(path.join(dir, '.git'));
};

exports.getGitHash = function getGitHash() {
  let rev;
  try {
    rev = fs
      .readFileSync('.git/HEAD')
      .toString()
      .trim()
      .split(/.*[: ]/)
      .slice(-1)[0];
  } catch (error) {
    rev = generateGUID().slice(0, 8);
  }

  if (rev.indexOf('/') === -1) {
    return rev;
  } else {
    try {
      return fs
        .readFileSync('.git/' + rev)
        .toString()
        .trim();
    } catch (error) {
      console.log(
        chalk.red('.git/refs/heads/master 访问失败，还没有进行过第一次提交。默认取值为 guid。')
      );
      return generateGUID().slice(0, 8);
    }
  }
};

exports.transformTime = function transformTime() {
  if (exports.isGitSync(process.cwd())) {
    return `${formatDate(Date.now(), 'yyyyMMddhhmmss')}.${exports.getGitHash().substring(0, 8)}`;
  } else {
    return `${formatDate(Date.now(), 'yyyyMMddhhmmss')}`;
  }
};

/**
 * 生成发布物的相关信息
 * @param system
 * @param type
 * @returns {{seePackageName: string, seePackageOptions: {system, templateFunc: ((function(): (string|string))|*), variablesFunc: ((function(): (*|[]|undefined))|*), name, description: string, type, version}}}
 */
exports.generateSeePackageInfo = function generateSeePackageInfo({ system, type }) {
  let seePackageName = `${system}-${name}-web`;
  const templateFunc = () => {
    if (type === 'bizframe') {
      return `./dist/config.local.js`;
    }

    // 子包遵循主框架的规范
    return `./dist/${name}/sysconfig.js`;
  };

  const variablesFunc = () => {
    try {
      const { variables } = require(`./package/variables.js`);

      return variables || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const seePackageOptions = {
    system,
    type,
    name,
    version,
    templateFunc,
    variablesFunc,
    description
  };

  if (isDocker) {
    seePackageName += '-docker';
    seePackageOptions.seePackageType = 'docker';
  }

  // 生成 see 发布物名称
  function generateSeePackageName() {
    let appVersion = version.replace('-patch', '.') || `1.0.0`;
    const appVersionArray = appVersion.split('.');
    appVersion = appVersionArray.length === 3 ? appVersion + '.0' : appVersion;
    const cloneBuildVersion = buildVersion || appVersion;

    seePackageName += `-${cloneBuildVersion}`;

    // npm run build:see 测试包
    // npm run build:see prod 生产包
    if (runtimeArgs[0] !== 'prod') {
      seePackageName += `-${exports.transformTime()}`;
    }
  }

  generateSeePackageName();

  return {
    seePackageOptions,
    seePackageName
  };
};
