var config = require('../config')
var webpack = require('webpack');
var path = require('path')
var baseWebpackConfig = require('./webpack-base-conf.js')
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin')
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ["es5-shim", "es5-shim/es5-sham", 'babel-polyfill',
  'es6-promise',
  'fetch-detector',
  'fetch-ie8',
  'fetch-jsonp',
  'react',
  'react-dom','react-router','./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
	module: {
    loaders:[
    	{
        test: /\.scss$/, 
        exclude:path.join(__dirname,'../src/modules/'+config.moduleName+'Module/assets/css'),
        loader: "style-loader!css-loader?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader!postcss-loader"
      },
      {
        test: /\.scss$/, 
        include:path.join(__dirname,'../src/modules/'+config.moduleName+'Module/assets/css'),
        loader: "style-loader!css-loader?sourceMap!sass-loader!postcss-loader"
      }
    ]
  },
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin(config[config.moduleName+'dev'].definePlugin),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: baseWebpackConfig.htmlPath['index'],
      inject: true
    }),
    new es3ifyPlugin()
  ]
})
