import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import(/* webpackChunkName: 'index' */ '@/views/index/index.vue')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index,
      meta: {
        requireAuth: true, // 需要认证
        title: '首页'
      }
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
