var  proxy  =  require('http-proxy-middleware');
var  fallback  =  require('connect-history-api-fallback');

module.exports  =  {
    cors: true,
    files:  [
        "./**/*.{html,htm,xml,css,js,json}"
    ],
    watchOptions:  {
        "ignored":  "node_modules"
    },
    server:  {
        "host":  "0.0.0.0",
        "https":  false,
        "baseDir": "./src/",
        "secure": false,
        "middleware":  {
		  1: proxy('/api/filedetails/', {target: 'https://camellia.ccss.capgemini.com:51058/filedetails', changeOrigin: true, pathRewrite: {'^/api/filedetails/' : ''}}),
		  2: proxy('/api/ftth-installation-rs/', {target: 'http://ftth-installation-app/ftth-installation-rs/', changeOrigin: true, pathRewrite: {'^/api/ftth-installation-rs/' : ''}}),
		  3: proxy('/api/location-data-rs/', {target: 'http://location-data-app/location-data-rs/', changeOrigin: true, pathRewrite: {'^/api/location-data-rs/' : ''}}),
		  4: fallback({index: '/index.html', verbose: true})
		}
    }
} 

