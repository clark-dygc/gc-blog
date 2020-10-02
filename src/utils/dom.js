import gc from '../utils/log'
const config = require('../config')

export function setObject(key, val) {
  val = val || {}
  localStorage.setItem(key, JSON.stringify(val))
}

export function getObject(key, df) {
  const raw = localStorage.getItem(key)
  let ret = df || {};
  if (raw) {
    try {
      ret = JSON.parse(raw)
    } catch (err) {
      gc.error(err)
      ret = df || {}
    }
  }
  return ret
}

export function setStr(key, val) {
  val = val || '';
  localStorage.setItem(key, val)
}
export function getStr(key, df) {
  return localStorage.getItem(key) || df;
}

export function getToken() {
  return getStr(config.TOKEN_KEY, '')
}

export function setToken(token) {
  setStr(config.TOKEN_KEY, token)
}
