const fs = require('fs-extra');
const path = require('path');
const Base64 = require('js-base64').Base64;
const { generateSeePackageZip } = require('@winner-fed/winner-deploy');
const { formatDate } = require('@winner-fed/cloud-utils');
const { name, version, buildVersion } = require('../../package.json');
const runtimeArgs = process.argv.slice(2);
// 系统分类，必须按照实际项目要求填写
const system = '';

if (!system) {
  throw new Error('system 不能为空！根据实际项目需求进行命名！');
}

// 应用类型
const type = 'bizframe';
const configName = 'config.local';
const templateFunc = () => {
  if (type === 'bizframe') {
    return `./dist/config.local.js`;
  }
};

const variablesFunc = () => {
  if (type === 'bizframe') {
    try {
      const { variables } = require(`./variables.js`);

      return variables || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
};

// 判断是否是 git
function isGitSync(dir) {
  return fs.existsSync(path.join(dir, '.git'));
}

function getGitHash() {
  let rev;
  try {
    rev = fs
      .readFileSync('.git/HEAD')
      .toString()
      .trim()
      .split(/.*[: ]/)
      .slice(-1)[0];
  } catch (error) {
    rev = Base64.encode(new Date());
  }

  if (rev.indexOf('/') === -1) {
    return rev;
  } else {
    return fs
      .readFileSync('.git/' + rev)
      .toString()
      .trim();
  }
}

function transformTime() {
  if (isGitSync(process.cwd())) {
    return `${formatDate(Date.now(), 'yyyyMMddhhmmss')}.${getGitHash().substring(0, 8)}`;
  } else {
    return `${formatDate(Date.now(), 'yyyyMMddhhmmss')}`;
  }
}

// 生成 see 发布物名称
function generateSeePackageName() {
  let appVersion = version.replace('-patch', '.') || `1.0.0`;
  const appVersionArray = appVersion.split('.');
  appVersion = appVersionArray.length === 3 ? appVersion + '.0' : appVersion;
  const cloneBuildVersion = buildVersion || appVersion;

  let seePackageName = `${system}-${name}-${cloneBuildVersion}`;

  // npm run build:see 测试包
  // npm run build:see prod 生产包
  if (runtimeArgs[0] !== 'prod') {
    seePackageName += `-${transformTime()}`;
  }

  return seePackageName;
}

const seePackageName = generateSeePackageName();

generateSeePackageZip({
  system,
  type,
  name,
  version,
  configName,
  templateFunc,
  variablesFunc,
  seePackageName
});
