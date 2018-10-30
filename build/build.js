require('shelljs/global');
var config = require('../config/');
env.NODE_ENV = 'production'
var webpack = require('webpack')
var ora = require('ora')
var path = require('path');
var webpackConfig = require('./webpack-prod-conf')

var spinner = ora('building for production...')
spinner.start()

var assetsPath = path.join(config[config.moduleName+'build'].assetsRoot, config[config.moduleName+'build'].assetsSubDirectory)
rm('-rf', assetsPath)
mkdir('-p', assetsPath)
//拷贝static所有文件到assetsPath
cp('-R', 'static/*', assetsPath)

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
