import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

import Login from '@/pages/Login.vue'
import NotFound from '@/pages/NotFound.vue'

import Home from '@/pages/Home.vue'
// import Articles from '@/pages/Articles'
// import NewArticle from '@/pages/NewArticle'
// import Flowers from '@/pages/Flowers'
import ArticleDetail from '@/pages/ArticleDetail'
// import EditArticle from '@/pages/EditArticle'
// import SignUpList from "@/pages/SignUpList"
// import VideoList from '@/pages/VideoList'

export const mainRoutes = {
  path: '/',
  component: () => import('@/layout'),
  children: [
    {
      path: '/',
      component: Home,
      meta: {
        name: '首页',
        icon: 'el-icon-s-home'
      },
      priority: 9999
    },
    {
      path: '/articles',
      component: () => import('@/pages/Articles'),
      meta: {
        name: '文章列表',
        icon: 'el-icon-document-copy'
      },
      priority: 9998
    },
    {
      path: '/article_detail',
      component: ArticleDetail, // () => import('@/pages/ArticleDetail'),
      hidden: true
    },
    {
      path: '/edit_article',
      component: () => import('@/pages/EditArticle'),
      hidden: true,
    },
    {
      path: '/flowers',
      component: () => import('@/pages/Flowers'),
      meta: {
        name: '鸟语花香',
        icon: 'el-icon-present'
      }
    },
    {
      path: '/components',
      component: () => import('@/layout'),
      meta: {
        name: '组件库',
        icon: 'el-icon-more'
      },
      children: [
        {
          path: '/signup_list',
          component: () => import("@/pages/SignUpList"),
          meta: {
            name: '登录组件',
            icon: 'el-icon-menu'
          }
        },
        {
          path: '/video_list',
          component: () => import('@/pages/VideoList'),
          meta: {
            name: '视频组件',
            icon: 'el-icon-video-camera'
          }
        }
      ]
    }
  ]
}
export const asyncRoutes = [
  {
    path: '/new_article',
    component: () => import('@/pages/NewArticle'),
    meta: {
      name: '创建文章',
      icon: 'el-icon-edit-outline'
    },
    priority: 9997
  },
]

export const constantRoutes = [
  {
    path: '/login',
    component: Login,
    meta: {
      name: '登录界面'
    }
  },
  mainRoutes,
  {
    path: '*',
    component: NotFound,
    meta: {
      name: '404'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes: constantRoutes
})

export default router
