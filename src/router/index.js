import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Work from '@/views/work'
import Home from '@/views/home'
import Layout from '@/views/home/components/layout'
import Project from '@/views/project'
import Variable from '@/views/variable'
import Interface from '@/views/interface'
import Case from '@/views/case'
import Suit from '@/views/suit'
import Task from '@/views/task'
import Summary from '@/views/summary'

Vue.use(VueRouter)

// 路由配置表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/work',
    name: 'work',
    component: Work
  },
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        name: 'layout',
        component: Layout
      },
      {
        path: '/index',
        name: 'index',
        component: Home
      },
      {
        path: '/project',
        name: 'project',
        component: Project
      },
      {
        path: '/interface',
        name: 'interface',
        component: Interface
      },
      {
        path: '/case',
        name: 'case',
        component: Case
      },
      {
        path: '/suit',
        name: 'suit',
        component: Suit
      },
      {
        path: '/variable',
        name: 'variable',
        component: Variable
      },
      {
        path: '/task',
        name: 'task',
        component: Task
      },
      {
        path: '/summary',
        name: 'summary',
        component: Summary
      },
    ]
  }
]

const router = new VueRouter({
  routes
})



// 路由导航守卫（拦截器）的作用就是控制页面的访问状态
// beforeEach 是全局前置守卫，任何页面的访问都要经过这里
// 路由导航守卫：说白了所有页面的导航都会经过这里
// 守卫页面的导航的
// to：要去的路由信息
// from：来自哪里的路由信息
// next：放行方法
router.beforeEach((to, from, next) => {
  // 如果要访问的页面不是 /login，校验登录状态
  // 如果没有登录，则跳转到登录页面
  // 如果登录了，则允许通过
  // 允许通过
  // next()

  const token = window.localStorage.getItem('token')

  // 校验非登录页面的登录状态
  if (to.path !== '/login') {
    if (token) {
      // 已登录，允许通过
      next()
    } else {
      // 没有登录，跳转到登录页面
      next('/login')
    }
  } else {
    // 登录页面，正常允许通过
    next()
  }
})

// 我们在组件中使用的 this.$router 其实就是这个模块中的 router
export default router
