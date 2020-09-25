import { login, register } from '../../api/user'
import gc from '../../utils/log'

const state = {
  email: "",
  name: "",
  id: 0,
  _id: "",
  type: 0,
  avatar: "",
  img_url: "",
  introduce: "",
  location: "",
  password: "",
  github_id: "",
  create_time: "",
  update_time: "",
}

const mutations = {
  SET_EMAIL: (state, email) => {
    state.email = email
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ID: (state, id) => {
    state.id = id
  },
  SET__ID: (state, _id) => {
    state._id = _id
  },
  SET_INTRODUCE: (state, introduce) => {
    state.introduce = introduce
  },
  SET_CREATE_TIME: (state, create_time) => {
    state.create_time = create_time
  },
  SET_UPDATE_TIME: (state, update_time) => {
    state.update_time = update_time
  }
}

const actions = {
  login({ commit }, userInfo) {
    const { email, password } = userInfo

    gc.info(`---<<<  email: ${email}, password: ${password}  >>>---`)

    return new Promise((resolve, reject) => {
      login(email, password).then(resp => {
        const { code, message, data } = resp.data;
        if (code !== 0) {
          gc.warn(`login failed, code: ${code}, message: ${message}`)
          reject(new Error(`code: ${code}, message: ${message}`))
        } else {
          gc.info(`login succeed, email: ${data.email}`)

          commit('SET_EMAIL', data.email)
          commit('SET_NAME', data.name)
          commit('SET_ID', data.id)
          commit('SET__ID', data._id)
          commit('SET_INTRODUCE', data.introduce)
          commit('SET_CREATE_TIME', data.create_time)
          commit('SET_UPDATE_TIME', data.update_time)

          resolve(data)
        }
      }).catch(err => {
        gc.error(err)
        reject(err)
      })
    })
  },
  register({ commit }, userInfo) {
    return new Promise((resolve, reject) => {
      register(userInfo).then(resp => {
        const { code, message, data } = resp.data
        if (code !== 0) {
          const msg = `code: ${code}, message: ${message}`
          gc.warn(msg)
          reject(new Error(msg))
        } else {
          gc.info(`login succeed, email: ${data.email}`)

          commit('SET_EMAIL', data.email)
          commit('SET_NAME', data.name)
          commit('SET_ID', data.id)
          commit('SET__ID', data._id)
          commit('SET_INTRODUCE', data.introduce)
          commit('SET_CREATE_TIME', data.create_time)
          commit('SET_UPDATE_TIME', data.update_time)

          resolve(data)
        }
      }).catch(err => {
        gc.error(err)
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
