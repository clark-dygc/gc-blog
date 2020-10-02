import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import article from './modules/article'


Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    article: article
  },
  state: {
  },
  getters: {
    userInfo: (state => {
      return {
        name: state.user.name,
        email: state.user.email,
        id: state.user.id,
        _id: state.user._id,
        introduce: state.user.introduce
      }
    }),
    posts: (state => {
      console.log(state.article.posts)
      return state.article.posts
    }),
    token: state => state.user.token
  }
})

export default store
