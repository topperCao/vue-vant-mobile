/**
 * 路由全局导航守卫
 */

import router from '@/router'
import store from '@/store'
import { Toast } from 'vant'

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  const isLogin = store.getters && store.getters.isLogin
  if (to.matched.some(record => record.meta.requireAuth) && !isLogin) {
    Toast('请先登录后访问')
    next({
      name: 'login',
      query: {
        redirect: to.name,
        ...to.query,
        ...to.params
      }
    })
  } else {
    next()
  }
})
