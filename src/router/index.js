import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '@/pages/Login.vue'
import Layout from '@/layout'
import NotFound from '@/pages/NotFound.vue'

import Home from '@/pages/Home.vue'
import Articles from '@/pages/Articles'
import NewArticle from '@/pages/NewArticle'
import Flowers from '@/pages/Flowers'
import ArticleDetail from '@/pages/ArticleDetail'
import EditArticle from '@/pages/EditArticle'

export const mainRoutes = [
  {
    path: '/',
    component: Home,
    meta: {
      name: '首页',
      icon: 'el-icon-s-home'
    }
  },
  {
    path: '/articles',
    component: Articles,
    meta: {
      name: '文章列表',
      icon: 'el-icon-document-copy'
    }
  },
  {
    path: '/new_article',
    component: NewArticle,
    meta: {
      name: '创建文章',
      icon: 'el-icon-edit-outline'
    }
  }, {
    path: '/article_detail',
    component: ArticleDetail,
    hidden: true
  },
  {
    path: '/edit_article',
    component: EditArticle,
    hidden: true,
  },
  {
    path: '/flowers',
    component: Flowers,
    meta: {
      name: '鸟语花香',
      icon: 'el-icon-present'
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes: [
    {
      path: '/login',
      component: Login,
      meta: {
        name: '登录界面'
      }
    },
    {
      path: '/',
      component: Layout,
      children: mainRoutes
    },
    {
      path: '*',
      component: NotFound,
      meta: {
        name: '404'
      }
    }
  ]
})

export default router
