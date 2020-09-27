const apiUrl = 'https://gc.dygc.site:8080/'

export default {
  apiUrl: process.env.NODE_ENV == 'production' ? apiUrl : 'http://127.0.0.1:5000/'
}
