const fs = require('fs-extra');
const { generateSeePackageZip } = require('@winner-fed/winner-deploy');
const { generateSeePackageInfo } = require('../utils');

// 系统分类，必须按照实际项目要求填写
const system = 'winner-front';

if (!system) {
  throw new Error('system 不能为空！根据实际项目需求进行命名！');
}

const type = 'bizframe';
const configName = 'config.local';

async function init() {
  // 1. 生成 see 发布物的名称及参数
  const { seePackageName, seePackageOptions } = generateSeePackageInfo({ system, type });

  // 2. 移除 package 文件夹
  fs.removeSync('./package');

  // 3. 生成 see 平台发布物
  // 生成 docker 包的同时也生成 see 包
  if (seePackageOptions.seePackageType === 'docker') {
    generateSeePackageZip(
      {
        ...seePackageOptions,
        configName,
        seePackageName
      },
      function () {
        generateSeePackageZip({
          ...seePackageOptions,
          seePackageType: 'web',
          configName,
          seePackageName: seePackageName.replace('-docker', '')
        });
      }
    );

    return;
  }

  generateSeePackageZip({
    ...seePackageOptions,
    configName,
    seePackageName
  });
}

init().catch((e) => {
  console.error(e);
});
