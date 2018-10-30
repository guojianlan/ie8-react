var path = require('path')
var config = require('../config')
var glob = require('glob');
var utils = require('./utils.js')
var projectRoot = path.resolve(__dirname, '../')
var enrtys = getEntry(path.join(__dirname,'../src/modules/'+config.moduleName+'Module/*.js'))
var htmlPath = getEntry(path.join(__dirname,'../src/modules/'+config.moduleName+'Module/*.html'))
module.exports = {
	htmlPath:htmlPath,
  entry: enrtys,
  output: {
    path: config[config.moduleName+'build'].assetsRoot,
    publicPath: process.env.NODE_ENV === 'production' ? config[config.moduleName+'build'].assetsPublicPath : config[config.moduleName+'dev'].assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    fallback: [path.join(__dirname, '../node_modules')],
    alias: {
    	'react$': 'react/react.js',
      'react-dom$': 'react-dom/index.js',
      'src': path.resolve(__dirname, '../src'),
      'modules':path.resolve(__dirname,'../src/modules'),
      'vendor':path.resolve(__dirname,'../src/vendor'),
      'assets':path.resolve(__dirname,'../src/modules/'+config.moduleName+'Module/assets')
    }
  },
  resolveLoader: {
    fallback: [path.join(__dirname, '../node_modules')]
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.resolve(__dirname,'../src'),
        // exclude: /node_modules/,
        query: {
          plugins: [],
        },
      },
      {
        test: /\.jsx$/,
        loader: 'babel',
        include: path.resolve(__dirname,'../src'),
        // exclude: /node_modules/,projectRoot,
        query: {
          plugins: [],
        },
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('images/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  // postcss:[require('autoprefixer')({browsers: ['last 2 versions']})]	
}

function getEntry(globPath) {
  var entries = {},
    basename, tmp, pathname;

  glob.sync(globPath).forEach(function (entry) {
    basename = path.basename(entry, path.extname(entry));
    tmp = entry.split('/').splice(-3);
    //pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[basename] = entry;
  });
  return entries;
}