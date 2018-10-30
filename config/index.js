var path = require('path')
var moduleName = process.argv[2];
module.exports = {
	moduleName:moduleName,
	icpJobdev:{
		port:8081,
		assetsRoot: path.resolve(__dirname, '../dist/icpJob'),
    assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/job': {
				target: 'https://127.0.0.1/',
				changeOrigin: true
			}
		},
    definePlugin:{
    	"process.env.NODE_ENV":JSON.stringify('dev'),
    	API_ROOT:JSON.stringify('woca')
    }
	},
	icpJobbuild:{
		index: path.resolve(__dirname, '../dist/static/icpJob/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist/'),
    assetsSubDirectory: 'static/icpJob',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    definePlugin:{
    	"process.env.NODE_ENV":JSON.stringify('production'),
    	API_ROOT:JSON.stringify('woca')
    }
	},
	icpAdmindev:{
		port:8081,
		assetsRoot: path.resolve(__dirname, '../dist/icp'),
    assetsSubDirectory: 'static',
		assetsPublicPath: '/',
		proxyTable: {
			'/admin': {
				target: 'https://127.0.0.1/',
				changeOrigin: true
			}
		},
    definePlugin:{
    	API_ROOT:JSON.stringify('woca')
    }
	},
	icpAdminbuild:{
		index: path.resolve(__dirname, '../dist/static/icpAdmin/index.html'),
		assetsRoot: path.resolve(__dirname, '../dist/'),
    assetsSubDirectory: 'static/icpAdmin',
    assetsPublicPath: '/',
    productionSourceMap: false,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    definePlugin:{
    	"process.env.NODE_ENV":JSON.stringify('production'),
    	API_ROOT:JSON.stringify('woca')
    }
	},
}