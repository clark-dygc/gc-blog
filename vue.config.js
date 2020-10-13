const os = require('os')
const CompressionPlugin = require('compression-webpack-plugin')

const platform = os.platform()

const cdn = {
  externals: {
    vue: 'Vue',
    vuex: 'Vuex',
    'vue-router': 'VueRouter',
    axios: 'axios',
    'element-ui': 'ELEMENT'
  },

  // 通过cdn方式使用
  js: [
    'https://cdn.bootcss.com/vue/2.6.11/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.1.2/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.1.2/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.19.2/axios.min.js',
    'https://cdn.bootcdn.net/ajax/libs/element-ui/0.1.1/index.js'
  ],
}

module.exports = {
  publicPath: '/',
  outputDir: (process.env.NODE_ENV === 'production' && platform !== 'win32') ? '/var/www/blog/client' : 'dist',
  productionSourceMap: false,
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        new CompressionPlugin({
          algorithm: 'gzip',
          test: /\.js$|\.html$\.css/,
          threshold: 10240,
          deleteOriginalAssets: false
        })
      )
      config.optimization = {
        // 分割代码块
        splitChunks: {
          cacheGroups: {
            //公用模块抽离
            common: {
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //抽离公共代码时，这个代码块最小被引用的次数
            },
            //第三方库抽离
            vendor: {
              priority: 1, //权重
              test: /node_modules/,
              chunks: 'initial',
              minSize: 0, //大于0个字节
              minChunks: 2, //在分割之前，这个代码块最小应该被引用的次数
            },
          },
        }
      }
    }
  },
  chainWebpack: config => {
    // 配置cdn引入
    config.plugin('html').tap((args) => {
      args[0].cdn = cdn;
      return args;
    });
    // 使用image-webpack-loader对图片进行压缩构建
    if (process.env.NODE_ENV === 'production') {
      config.module
        .rule('images')
        .test(/\.(png|jpg|jpeg|gif|svg|svgz)$/i)
        .use('image-webpack-loader')
        .loader('image-webpack-loader')
        .options({
          // 调试模式（debug mode）下不做处理
          bypassOnDebug: true
        })
        .end();
    }
  }
}
