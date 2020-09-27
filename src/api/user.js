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
    data: { data }
  })
}
