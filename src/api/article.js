import axios from 'axios'
import config from '../config'
import request from '../utils/request'

export async function addArticle(data) {
  return request({
    url: '/oa/addArticle',
    method: "POST",
    data: data
  })
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

export async function getCommentList(keyword, is_handle, pageNum, pageSize) {
  /**
   * 这个接口有问题，都没有article_id字段
   */
  return request({
    url: '/getCommentList',
    method: 'GET',
    data: {
      keyword,
      is_handle,
      pageNum,
      pageSize
    }
  })
}

export async function addComment(comment) {
  return request({
    url: '/oa/addComment',
    method: 'POST',
    data: comment
  })
}
