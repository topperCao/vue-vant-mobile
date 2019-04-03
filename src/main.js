import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

import 'amfe-flexible'

import '@/styles/index.less'

import Vant from 'vant'
import 'vant/lib/index.css'

import FastClick from 'fastclick'

import '@/utils/beforeEach.js'

Vue.use(Vant)

FastClick.attach(document.body)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
