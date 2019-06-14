import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import 'amfe-flexible'

import '@/styles/index.less'

import Vant from 'vant'
import 'vant/lib/index.css'

import '@/utils/routerEach.js'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
