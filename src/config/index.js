const prodApiUrl = 'https://gc.dygc.site:5000/'
const debugApiUrl = 'http://127.0.0.1:5000/'

const token_key = 'DYGC.BLOG.TOKEN.KEY'

export default {
  apiUrl: process.env.NODE_ENV == 'production' ? prodApiUrl : debugApiUrl,
  TOKEN_KEY: token_key
}
