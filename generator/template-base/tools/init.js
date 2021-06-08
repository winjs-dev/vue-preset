//
const { readFileSync, writeFileSync } = require('fs');
const chalk = require('chalk');
const path = require('path');
const {rm, exec } = require('shelljs');
// Note: These should all be relative to the project root directory
const rmFiles = [
  'tools/init.js'
];

/**
 * Removes items from the project that aren't needed after the initial setup
 */
function removeItems () {
  console.log(chalk.white('Removed'));

  // The directories and files are combined here, to simplify the function,
  // as the 'rm' command checks the item type before attempting to remove it
  let rmItems = rmFiles;
  rm('-rf', path.resolve(__dirname, '..', 'tools'));
  console.log(chalk.red(rmItems.join('\n')));

  console.log('\n');
}

/**
 * Calls any external programs to finish setting up the library
 */
function finalize () {
  console.log(chalk.white('Finalizing'));
  // git
  <%_ if (options['version-control'] === 'git') { _%>
  exec('npm run install:husky');
  <%_ } _%>
  exec('npm run prettier');
  exec('npm run lint');
  exec('npm run lint:style');
  // Remove post-install command
  let jsonPackage = path.resolve(__dirname, '..', 'package.json');
  const pkg = JSON.parse(readFileSync(jsonPackage));

  // Note: Add items to remove from the package file here
  delete pkg.scripts.postinstall;

  writeFileSync(jsonPackage, JSON.stringify(pkg, null, 2));
  console.log(chalk.green('Postinstall script has been removed'));

  console.log('\n');
}

(() => {
  removeItems();
  finalize();
})();

