import axios from 'axios'
import qs from 'qs'
import config from '../config'

export async function login(email, password) {
  return axios.post(config.apiUrl + 'login', { email: email, password: password })
}

export async function register(data) {
  console.log(data);
  return axios.post(config.apiUrl + 'register', data);
}
