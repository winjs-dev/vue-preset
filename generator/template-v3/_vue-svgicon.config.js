const path = require('path');
const svgFilePaths = ['src/icons/svg'].map((v) => path.resolve(v));
const tagName = 'svg-icon';

module.exports = {
  tagName,
  svgFilePath: svgFilePaths,
  svgoConfig: {},
  pathAlias: {
    '@icon': svgFilePaths[0],
  },
  transformAssetUrls: {
  }
};
