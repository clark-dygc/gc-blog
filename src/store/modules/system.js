import { getSystemInfo, updateSystemInfo } from '../../api/system'
import gc from '../../utils/log'

const state = {
  systemInfo: {
    hostname: '',
    type: '',
    platform: '',
    arch: '',
    release: '',
    uptime: 0,
    totalmem: 0,
    freemem: 0,
    cpus: []
  }
}

const mutations = {
  SET_SYSTEM_INFO: (state, systemInfo) => {
    state.systemInfo = systemInfo
  },
  UPDATE_SYSTEM_INFO: (state, systemInfo) => {
    state.systemInfo.freemem = systemInfo.freemem
    state.systemInfo.uptime = systemInfo.uptime
    state.systemInfo.cpus = systemInfo.cpus
  }
}

const actions = {
  getSystemInfo({ commit }) {
    return new Promise((resolve, reject) => {
      getSystemInfo().then(resp => {
        const { code, message, data } = resp.data
        if (code !== 0) {
          const msg = `api-getSystemInfo, code: ${code}, message: ${message}`
          gc.warn(msg)
          reject(new Error(msg))
        } else {
          commit('SET_SYSTEM_INFO', data)
          resolve(data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateSystemInfo({ commit }) {
    return new Promise((resolve, reject) => {
      updateSystemInfo().then(resp => {
        const { code, message, data } = resp.data
        if (code !== 0) {
          const msg = `api-updateSystemInfo, code: ${code}, message: ${message}`
          gc.warn(msg)
          reject(new Error(msg))
        } else {
          commit('UPDATE_SYSTEM_INFO', data)
          resolve(data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  }
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
