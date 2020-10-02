const prodApiUrl = 'https://gc.dygc.site:8080/'
const debugApiUrl = 'http://127.0.0.1:5000/'

export default {
  apiUrl: process.env.NODE_ENV == 'production' ? prodApiUrl : debugApiUrl
}
