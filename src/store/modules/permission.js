import { constantRoutes, mainRoutes, asyncRoutes } from "@/router";

const state = {
  routes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise((resolve, reject) => {
      const routes = asyncRoutes
      let accessdRoutes

      if (roles.includes('author')) {
        mainRoutes.children.push.apply(mainRoutes.children, routes)
        accessdRoutes = mainRoutes
      } else {
        accessdRoutes = mainRoutes
      }

      commit('SET_ROUTES', accessdRoutes)

      resolve(accessdRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
