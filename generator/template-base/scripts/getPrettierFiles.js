const glob = require('glob');

const getPrettierFiles = () => {
  let files = [];
  const jsFiles = glob.sync('**/*.js*', {
    ignore: ['**/node_modules/**', 'dist/**', 'public/**', 'src/services/RESTFULLURL.js']
  });
  const tsFiles = glob.sync('src/**/*.ts*', {
    ignore: ['**/node_modules/**']
  });
  const plopFiles = glob.sync('plop-templates/**/*.js*', {
    ignore: ['**/node_modules/**']
  });
  const lessFiles = glob.sync('src/**/*.less*', {
    ignore: ['**/node_modules/**']
  });
  const vueFiles = glob.sync('src/**/*.vue*', {
    ignore: ['**/node_modules/**']
  });
  const mdFiles = glob.sync('src/**/*.md*', {
    ignore: ['**/node_modules/**']
  });
  files = files.concat(jsFiles);
  files = files.concat(tsFiles);
  files = files.concat(plopFiles);
  files = files.concat(lessFiles);
  files = files.concat(vueFiles);
  files = files.concat(mdFiles);
  if (!files.length) {
    return;
  }
  return files;
};

module.exports = getPrettierFiles;
