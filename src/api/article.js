import axios from 'axios'
import config from '../config'

export async function addArticle(data) {
  return axios.post(config.apiUrl + 'addArticle', data)
}

export async function getArticleList(query) {
  return axios.get(config.apiUrl + 'getArticleList', query)
}

export async function delArticle(query) {
  return axios.post(config.apiUrl + 'delArticle', query)
}

export async function getArticleDetail(query) {
  return axios.post(config.apiUrl + 'getArticleDetail', query)
}

export async function updateArticle(article) {
  return axios.post(config.apiUrl + 'updateArticle', article)
}
