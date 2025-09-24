import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入views组件
import Home from '@/views/Home'
import Login from '@/views/Login'
import Layout from '@/views/Layout'
import About from '@/views/About'
import Terms from '@/views/Terms'
import NotFound from '@/views/NotFound'

import Detection from '@/views/Layout/detection' // 新闻检测页
import History from '@/views/Layout/history' // 历史记录页
import Profile from '@/views/Layout/profile' // 个人中心页
import Dashboard from '@/views/Layout/dashboard' // 数据统计页

Vue.use(VueRouter)
// 制定路由规则
const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  { path: '/home', component: Home },
  { path: '/login', component: Login },
  { path: '/about', component: About },
  { path: '/terms', component: Terms },
  {
    path: '/layout',
    component: Layout,
    redirect: '/layout/detection',
    children: [
      { path: 'detection', component: Detection },
      { path: 'history', component: History },
      { path: 'profile', component: Profile },
      { path: 'dashboard', component: Dashboard }
    ]
  },
  { path: '/404', component: NotFound },
  { path: '*', redirect: '/404' }
]

const router = new VueRouter({
  routes
})

// 全局前置导航守卫
router.beforeEach((to, from, next) => {
  // 获取本地存储的token
  // const token = store.getters.token // 如果无token得到的是空字符串

  // 先不急着配置~
  // if (token && to.path === '/login') {
  //   next('/layout')
  // } else if (!token && to.path !== '/home' && to.path !== '/login') {
  //   next('/home')
  // } else {
  //   next()
  // }
  next()
})

export default router
