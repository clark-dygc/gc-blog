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
import ECharts from "@/pages/ECharts"
import SignUpList from "@/pages/SignUpList"
import VideoList from '@/pages/VideoList'

export const mainRoutes = {
  path: '/',
  component: Layout,
  children: [
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
    }, {
      path: '/echarts',
      component: ECharts,
      meta: {
        name: 'ECharts',
        icon: 'el-icon-orange'
      },
      hidden: true
    },
    {
      path: '/signup_list',
      component: SignUpList,
      meta: {
        name: '登录组件',
        icon: 'el-icon-menu'
      }
    }, {
      path: '/video_list',
      component: VideoList,
      meta: {
        name: '视频组件',
        icon: 'el-icon-video-camera'
      }
    }
  ]
}
export const asyncRoutes = [
  {
    path: '/new_article',
    component: NewArticle,
    meta: {
      name: '创建文章',
      icon: 'el-icon-edit-outline'
    }
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
