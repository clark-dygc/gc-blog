import { addArticle, getArticleList, delArticle, updateArticle, likeArticle } from '../../api/article'
import gc from '../../utils/log'

const state = {
  content: '',
  count: 0,
  posts: []
}

const mutations = {
  SET_CONTENT: (state, content) => {
    state.content = content
  },
  SET_POSTS: (state, posts) => {
    state.posts = posts
    console.log(posts)
  },
  SET_COUNT: (state, count) => {
    state.count = count
  },
  ADD_POST: (state, article) => {
    // todo 这里的数据结构可以需要注意下
    const post = {}
    post._id = article._id
    post.title = article.title
    post.desc = article.desc
    post.create_time = article.create_time
    post.update_time = article.update_time
    post.meta = article.meta
    post.tags = article.tags
    post.category = article.category
    state.posts.unshift(post)
  },
  DEL_POST: (state, id) => {
    const idx = state.posts.findIndex(p => p._id == id);
    if (idx !== -1) {
      state.posts.splice(idx, 1)
    }
  },
  UPDATE_POST: (state, article) => {
    const post = state.posts.find(p => p._id == article.id);
    if (!post) {
      gc.warn(`未找到对应文章, article_id: ${article.id}`)
    } else {
      post._id = article.id
      post.title = article.title
      post.desc = article.desc
      post.author = article.author
    }
  },
  LIKE_ARTICLE: (state, { article_id, like_user }) => {
    const article = state.posts.find(p => p._id == article_id);
    if (!article) {
      gc.warn(`未找到对应文章, article_id: ${article_id}`)
    } else {
      article.meta.likes += 1
    }
  }
}

const actions = {
  addArticle({ commit }, article) {
    return new Promise((resolve, reject) => {
      addArticle(article).then(resp => {
        const { code, message, data } = resp.data

        commit('SET_CONTENT', data.content)

        if (code !== 0) {
          reject(new Error(`code: ${code}, message: ${message}`))
        } else {
          commit('ADD_POST', data)
          resolve(data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  getArticleList({ commit }, query) {
    return new Promise((resolve, reject) => {
      getArticleList(query).then(resp => {
        const { code, message, data } = resp.data
        if (code !== 0) {
          reject(new Error(`code: ${code}, message: ${message}`))
        } else {
          commit('SET_COUNT', data.count)
          commit('SET_POSTS', data.list)

          resolve(data)
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  delArticle({ commit }, query) {
    return new Promise((resolve, reject) => {
      delArticle(query).then(resp => {
        const { code, message, data } = resp.data
        if (code !== 0) {
          reject(new Error(`code: ${code}, message: ${message}`))
        } else {
          commit('DEL_POST', query.id)
          resolve()
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  updateArticle({ commit }, article) {
    return new Promise((resolve, reject) => {
      updateArticle(article).then(resp => {
        const { code, message, data } = resp.data
        if (code !== 0) {
          reject(new Error(`code: ${code}, message: ${message}`))
        } else {
          commit('UPDATE_POST', article)

          resolve()
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  likeArticle({ commit }, query) {
    return new Promise((resolve, reject) => {
      likeArticle(query).then(resp => {
        const { code, message, data } = resp.data
        if (code !== 0) {
          const msg = `api: likeArticle, code: ${code}, message: ${message}`
          gc.warn(msg)
          reject(new Error(msg))
        } else {
          commit('LIKE_ARTICLE', {
            article_id: query.id,
            like_user: data
          })
          resolve(data)
        }
      }).catch(err => {
        gc.warn(`api: likeArticle, err.message: ${err.message}`)
        reject(err)
      })
    })

  }
}

export default {
  namespaced: true,
  state: state,
  mutations: mutations,
  actions: actions,
}
