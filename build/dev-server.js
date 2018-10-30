var config = require('../config')

var path = require('path')
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var fs=require('fs');
var os=require('os');
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = require('./webpack-dev-conf.js')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config[config.moduleName+'dev'].port
// Define HTTP proxies to your custom API backend

var proxyTable = config[config.moduleName+'dev'].proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  stats: {
    colors: true,
    chunks: false
  }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = {
      target: options
    }
  }
  app.use(proxyMiddleware(context, options))
})
// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)
var getIPAdress = function(){
  var interfaces = os.networkInterfaces();
  for(var devName in interfaces){
    var iface = interfaces[devName];
    for(var i=0;i<iface.length;i++){
      var alias = iface[i];
      if(alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal){
        return alias.address;
      }
    }
  }
  return '127.0.0.1'
};
// serve pure static assets
var staticPath = path.posix.join(config[config.moduleName+'dev'].assetsPublicPath, config[config.moduleName+'dev'].assetsSubDirectory)
app.use(staticPath, express.static('./static'))
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }
  var uri = `http://${getIPAdress()}:${port}`
  console.log('Listening at ' + uri + '\n')

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
})
