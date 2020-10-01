module.exports = {
  publicPath: '/',
  outputDir: process.env.NODE_ENV === 'production' ? '/var/www/blog/client' : 'dist'
}
