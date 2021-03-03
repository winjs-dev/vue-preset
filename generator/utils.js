const fs = require('fs');
const rimraf = require('rimraf');

module.exports = (api) => {
  return {
    deleteFile(path) {
      const file = api.resolve(path);
      rimraf.sync(file);
    },
    deleteDir(path) {
      const dir = api.resolve(path);
      rimraf.sync(dir);
    }
  };
};
