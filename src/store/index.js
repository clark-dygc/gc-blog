import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import article from './modules/article'
import permission from './modules/permission'
import comment from './modules/comment'
import system from './modules/system'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    article,
    permission,
    comment,
    system
  },
  state: {
    arr: ['AAAAA', 'BBBBBBBBBB', 'CCCCCCCC', 'DDDDDDDDDDDD'],
    roles: [],
    obj: { 'A': 'AAA', 'B': 'BBB', 'C': 'CCC' }
  },
  getters: {
    userInfo: (state => {
      return state.user.email ? {
        name: state.user.name,
        email: state.user.email,
        id: state.user.id,
        _id: state.user._id,
        introduce: state.user.introduce
      } : null
    }),
    token: state => state.user.token,
    routes: state => state.permission.routes,
    roles: state => state.roles,
    getComments: (state) => (article_id) => {
      return state.comment.comments.filter(c => c.article_id === article_id)
    },
    systemInfo: state => state.system.systemInfo
  },
  mutations: {
    PUSH_ARR: (state, ele) => {
      state.arr.push(ele)
    },
    RESET_ARR: (state, arr) => {
      state.arr = arr
    },
    ADD_ELE: (state, [key, ele]) => {
      console.log(key)
      state.obj[key] = ele
    },
    DEL_ELE: (state, key) => {
      delete state.obj[key]
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },
  actions: {
    push({ commit }, ele) {
      commit('PUSH_ARR', ele)
    },
    reset({ commit }, arr) {
      commit('RESET_ARR', arr)
    },
    addEle({ commit }, key, ele) {
      commit('ADD_ELE', key, ele)
    },
    delEle({ commit }, key) {
      commit('DEL_ELE', key)
    },
    setRoles({ commit }, roles) {
      commit('SET_ROLES', roles)
    }
  }
})

export default store
