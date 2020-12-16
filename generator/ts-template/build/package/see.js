const {generateSeePackageZip} = require('@winner-fed/winner-deploy');
const {name, version} = require('../../package.json');
// 系统分类默认为
const system = 'winner-front';
// 子系统
const type = 'subsystem';
const configName = 'config.local';
const templateFunc = () => {
  if (type === 'subsystem') {
    return `./dist/config.local.js`;
  }
};

const variablesFunc = () => {
  if (type === 'subsystem') {
    try {
      const {variables} = require(`./variables.js`);

      return variables || [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }
};

generateSeePackageZip({system, type, name, version, configName, templateFunc, variablesFunc});
