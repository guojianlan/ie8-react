var config = require('../config')
var path = require('path');

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV === 'production'
    ? config[config.moduleName+'build'].assetsSubDirectory
    : config[config.moduleName+'dev'].assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}