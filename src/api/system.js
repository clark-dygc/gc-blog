import request from '../utils/request'

export async function getSystemInfo() {
  return request({
    url: '/getSystemInfo',
    method: 'GET',
  })
}

export async function updateSystemInfo() {
  return request({
    url: '/updateSystemInfo',
    method: 'GET',
  })
}
