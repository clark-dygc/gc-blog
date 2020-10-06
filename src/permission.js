import router from './router'
import NProgress from 'nprogress'
import store from './store'
import gc from './utils/log'
import user from './store/modules/user'

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = store.getters.token;

  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
      NProgress.done();
    } else {
      const roles = store.getters.roles
      if (roles.length === 0) {
        const roles = ['reader']
        await store.dispatch('setRoles', roles)
        const authorRoutes = await store.dispatch('permission/generateRoutes', roles)
        
        router.addRoutes([authorRoutes])
      }
      next()
      NProgress.done();
    }
  } else {
    // 如果已经有token了，不用登录，直接进入home页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      const checkUserInfo = () => {
        let userInfo = store.getters.userInfo
        return userInfo && userInfo.email
      }
      if (!checkUserInfo()) {
        await store.dispatch('user/getUserInfo')
        const roles = checkUserInfo() ? ['author'] : []
        await store.dispatch('setRoles', roles)
        const authorRoutes = await store.dispatch('permission/generateRoutes', roles)
        router.addRoutes([authorRoutes])
      }
      next();
      NProgress.done();
    }
  }
})

router.afterEach((to, from) => {
  if (to.meta && to.meta.name) {
    document.title = to.meta.name
  }
})
