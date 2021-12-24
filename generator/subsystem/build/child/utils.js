const path = require('path');
const fse = require('fs-extra');
const pkg = require('../../package.json');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const context = process.cwd();
const childName = process.env.npm_config_child || pkg.name;

exports.resolve = function (dir) {
  return path.resolve(context, dir);
};

exports.spJsPath = function (_path) {
  if (_path.indexOf('manifest') >= 0 && _path.indexOf('chunk-manifest') < 0) {
    return path.posix.join('', 'manifest.js');
  }
  return path.posix.join('', _path);
};

exports.assetsPath = function (_path) {
  const assetsSubDirectory = 'static';
  return path.posix.join(assetsSubDirectory, _path);
};

exports.getDateTimeString = function () {
  const date = new Date();
  const splitter = '-';
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  return `${year}${splitter}${month}${splitter}${day} ${hour}:${min}:${sec}`;
};

exports.getSubSystemVersion = function (sysName) {
  let version;
  try {
    const meta = require(resolve(`build/package/variables`));
    console.log('meta', meta);
    version = meta.version;
  } catch (err) {}
  return version;
};

/**
 * @description generate webpack style modules
 * @param {boolean} extract - css extract
 * @param {boolean} sourceMap - css source map
 * @param {string} localIdentName - localIdentName for css-loader options
 */
exports.generateStyleModules = function ({
  extract,
  sourceMap,
  localIdentName = '[local]_[hash:base64:5]'
}) {
  return [
    {
      test: /\.css$/i, // 这里匹配 `<style module>`
      oneOf: [
        {
          resourceQuery: /module/,
          use: [
            generateStyleLoader({ extract }),
            generateCssLoader({
              sourceMap,
              modules: true,
              localIdentName
            }),
            generatePostcssLoader({ sourceMap, modules: true })
          ]
        },
        {
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          use: [
            generateStyleLoader({ extract }),
            generateCssLoader({ sourceMap, modules: false }),
            generatePostcssLoader({ sourceMap, modules: false })
          ]
        }
      ]
    },
    {
      test: /\.less$/i, // 这里匹配 `<style module>`
      oneOf: [
        {
          resourceQuery: /module/,
          use: [
            generateStyleLoader({ extract }),
            generateCssLoader({
              sourceMap,
              modules: true,
              localIdentName
            }),
            generatePostcssLoader({ sourceMap, modules: true }),
            generateLessLoader({ sourceMap })
          ]
        },
        {
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          use: [
            generateStyleLoader({ extract }),
            generateCssLoader({ sourceMap, modules: false }),
            generatePostcssLoader({ sourceMap, modules: false }),
            generateLessLoader({ sourceMap })
          ]
        }
      ]
    },
    {
      test: /\.s[ac]ss$/i, // 这里匹配 `<style module>`
      oneOf: [
        {
          resourceQuery: /module/,
          use: [
            generateStyleLoader({ extract }),
            generateCssLoader({
              sourceMap,
              modules: true,
              localIdentName
            }),
            generatePostcssLoader({ sourceMap, modules: true }),
            generateSassLoader({ sourceMap })
          ]
        },
        {
          // 这里匹配普通的 `<style>` 或 `<style scoped>`
          use: [
            generateStyleLoader({ extract }),
            generateCssLoader({ sourceMap, modules: false }),
            generatePostcssLoader({ sourceMap, modules: false }),
            generateSassLoader({ sourceMap })
          ]
        }
      ]
    }
  ];
};

function generateLessLoader({ sourceMap }) {
  return {
    loader: 'less-loader',
    options: {
      sourceMap,
      // 全局注入变量及mixins
      additionalData: `@import "@/assets/style/variable.less";@import "@winner-fed/magicless/magicless.less";`
    }
  };
}

function generateSassLoader({ sourceMap }) {
  return {
    loader: 'sass-loader',
    options: {
      sourceMap
    }
  };
}

function generatePostcssLoader({ sourceMap, modules }) {
  const options = {
    sourceMap,
    plugins: (loader) => {
      const plugins = [
        require('postcss-import')({ root: loader.resourcePath }),
        require('autoprefixer')({
          overrideBrowserslist: ['defaults', 'ie 10', 'last 2 versions', '> 1%']
        })
      ];

      return plugins;
    }
  };

  return {
    loader: 'postcss-loader',
    options
  };
}

function generateCssLoader({ sourceMap, modules, localIdentName }) {
  const options = { sourceMap };

  if (modules) {
    options.modules = false; // make sure style-isolate works right now
    options.localIdentName = localIdentName;
  }

  return {
    loader: 'css-loader',
    options
  };
}

function generateStyleLoader({ extract }) {
  if (extract) {
    return {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: '../'
      }
    };
  } else {
    return 'vue-style-loader';
  }
}

exports.camelize = function camelize(str) {
  return (str + '').replace(/-\D/g, function (match) {
    return match.charAt(1).toUpperCase();
  });
};

// 适配财富中台外框架
exports.generateVersion = function () {
  // 增加主系统版本号version读取, 如果是三位的则自动补零
  const subcontractPackage = process.env.npm_package_subcontract === 'true' || false;
  let appVersion = process.env.npm_package_version;
  appVersion = appVersion.replace('-patch', '.') || `1.0.0`;
  const appVersionArray = appVersion.split('.');
  appVersion = appVersionArray.length === 3 ? appVersion + '.0' : appVersion;
  const tmpPath = path.resolve(path.resolve(__dirname, '../../node_modules'), childName + '/.tmp');

  fse.ensureDirSync(tmpPath);
  fse.writeFileSync(
    tmpPath + '/version.js',
    `define(function() {return{"version":"${appVersion}","subcontract-package":${subcontractPackage}}})`,
    'utf-8'
  );
};

// 移除 version.js
exports.removeVersion = function () {
  fse.removeSync(path.resolve(path.resolve(__dirname, '../../node_modules'), childName));
};

// 除了 /views，其他目录前面都添加 childName
exports.appendPrefixViews = function (dirPath) {
  if (dirPath && dirPath.indexOf('/views') === -1) {
    return dirPath.replace(`${childName}/`, '');
  }

  return dirPath;
};
