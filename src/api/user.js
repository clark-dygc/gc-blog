import axios from 'axios'
import qs from 'qs'
import config from '../config'
import request from '../utils/request'

export async function login(email, password) {
  return request({
    url: '/login',
    method: 'POST',
    data: { email: email, password: password }
  })
}

export async function register(data) {
  return request({
    url: '/register',
    method: 'POST',
    data: data
  })
}

export async function getUserInfo(email) {
  return request({
    url: '/getUserInfo',
    method: 'GET',
    data: { email: email }
  })
}

export async function logout() {
  return request({
    url: '/logout',
    method: 'GET',
  })
}

export async function resetToken(email) {
  return request({
    url: '/resetToken',
    method: 'POST',
    data: { email: email }
  })
}
