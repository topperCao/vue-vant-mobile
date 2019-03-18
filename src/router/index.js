import Vue from 'vue'
import Router from 'vue-router'

const Index = () => import(/* webpackChunkName: 'index' */ '@/views/index/index.vue')
const Login = () => import(/* webpackChunkName: "login" */ '@/views/login/login.vue')
const Register = () => import(/* webpackChunkName: "register" */ '@/views/login/register.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    }
  ]
})
