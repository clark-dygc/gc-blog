import axios from 'axios'
import config from '../config'
import request from '../utils/request'

export async function addArticle(data) {
  return axios.post(config.apiUrl + 'addArticle', data)
}

export async function getArticleList(query) {
  return request({
    url: 'getArticleList',
    method: 'GET',
    data: query
  })
}

export async function delArticle(query) {
  return request({
    url: '/oa/delArticle',
    method: 'POST',
    data: query
  })
}

export async function getArticleDetail(query) {
  return request({
    url: 'getArticleDetail',
    method: 'POST',
    data: query
  })
}

export async function updateArticle(article) {
  return request({
    url: '/oa/updateArticle',
    method: 'POST',
    data: article
  })
}
