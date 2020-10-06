import { addComment } from '../../api/article'
import gc from '../../utils/log'

const state = {
  comments: []
}

const mutations = {
  ADD_COMMENT: (state, comment) => {
    state.comments.push(comment)
  },
  SET_COMMENTS: (state, comments) => {
    state.comments = comments
  }
}

const actions = {
  addComment({ commit }, comment) {
    return new Promise((resolve, reject) => {
      addComment(comment).then(resp => {
        const { code, message, data } = resp.data
        if (code !== 0) {
          reject(new Error(`code: ${code}, message: ${message}`))
        } else {
          commit('ADD_COMMENT', data)
          resolve(data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  setComments({ commit }, comments) {
    return new Promise((resolve, reject) => {
      commit('SET_COMMENTS', comments)
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
