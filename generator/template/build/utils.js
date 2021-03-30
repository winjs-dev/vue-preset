'use strict';

const svnInfo = require('svn-info');
const pkg = require('../package.json');

// 获取当前SVN版本信息
// { path: 'h5-isee-financial-component',
//   url:
//   'https://*.*.*.*/BrokerNet/iSeeRobotAdvisor/trunk/Sources/web/h5-isee-financial-component',
//   relativeUrl: '^/trunk/Sources/web/h5-isee-financial-component',
//   repositoryRoot: 'https://*.*.*.*/BrokerNet/iSeeRobotAdvisor',
//   repositoryUuid: '4c2a55e3-85bc-7745-89fe-3553e2e4e147',
//   revision: '14248',
//   nodeKind: 'directory',
//   lastChangedAuthor: 'author',
//   lastChangedRev: '14243',
//   lastChangedDate: '2019-01-22 10:29:32 +0800 ( ܶ , 22 һ   2019)' }
exports.getCurrentVersion = function () {
  // 当前项目的 svn 绝对路径
  const svnUrl = '';

  if (svnUrl) {
    return svnInfo.sync(svnUrl, 'HEAD').lastChangedRev;
  }

  return pkg.name;
};
