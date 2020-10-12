const os = require('os')
const CompressionPlugin = require('compression-webpack-plugin')

const platform = os.platform()

module.exports = {
  publicPath: '/',
  outputDir: (process.env.NODE_ENV === 'production' && platform !== 'win32') ? '/var/www/blog/client' : 'dist',
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      return {
        plugins: [
          new CompressionPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$\.css/,
            threshold: 10240,
            deleteOriginalAssets: false
          })
        ]
      }
    }
  }
}
