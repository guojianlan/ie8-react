var config = require('../config')
var webpack = require('webpack');
var path = require('path');
var baseWebpackConfig = require('./webpack-base-conf.js')
var utils = require('./utils.js')
var merge = require('webpack-merge');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
const es3ifyPlugin = require('es3ify-webpack-plugin');
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ["es5-shim", "es5-shim/es5-sham", 'babel-polyfill',
  'es6-promise',
  'fetch-detector',
  'fetch-ie8',
  'fetch-jsonp',
  'react',
  'react-dom','react-router'].concat(baseWebpackConfig.entry[name])
})
var webpackConfig = merge(baseWebpackConfig, {
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
        loader: ExtractTextPlugin.extract("style-loader","css-loader?sourceMap!sass-loader!postcss-loader")
      }
    ]
  },
  devtool: config[config.moduleName+'build'].productionSourceMap ? '#source-map' : false,
  output: {
    path: config[config.moduleName+'build'].assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    new webpack.DefinePlugin(config[config.moduleName+'build'].definePlugin),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: true,
        screw_ie8: false,
      },
      mangle: { screw_ie8: false },
      output: { screw_ie8: false },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(utils.assetsPath('css/[name].[contenthash].css')),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config[config.moduleName+'build'].index,
      template: baseWebpackConfig.htmlPath['index'],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      },
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency'
    }),
    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module, count) {
        // any required modules inside node_modules are extracted to vendor
        return (
          module.resource &&
          /\.js$/.test(module.resource) &&
          module.resource.indexOf(
            path.join(__dirname, '../node_modules')
          ) === 0
        )
      }
    }),
    // extract webpack runtime and module manifest to its own file in order to
    // prevent vendor hash from being updated whenever app bundle is updated
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      chunks: ['vendor']
    })
  ]
})

if (config[config.moduleName+'build'].productionGzip) {
  var CompressionWebpackPlugin = require('compression-webpack-plugin')
  webpackConfig.module.loaders
    .find(x => x.loader === 'babel').query.plugins
    .unshift(
    'transform-react-remove-prop-types',
    'transform-react-constant-elements',
    'transform-react-inline-elements',
    'transform-es3-modules-literals',
    'transform-es3-member-expression-literals',
    'transform-es3-property-literals'
    )
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' +
        config[config.moduleName+'build'].productionGzipExtensions.join('|') +
        ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new es3ifyPlugin()
  )
}

module.exports = webpackConfig