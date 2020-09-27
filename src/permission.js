import router from './router'
import NProgress from 'nprogress'
import store from './store'

import gc from './utils/log'

const whiteList = ['/login', '/auth-redirect']

router.beforeEach(async (to, from, next) => {
  NProgress.start()

  const hasToken = store.getters.token;

  if (!hasToken) {
    if (whiteList.indexOf(to.path) !== -1) {
      next();
      NProgress.done();
    } else {
      next('/login')
      NProgress.done();
    }
  } else {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
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
