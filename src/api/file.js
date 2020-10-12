import request from '../utils/request'

export async function uploadImage(formdata) {
  return request({
    url: '/uploadImage',
    method: 'POST',
    data: formdata,
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  })
}
