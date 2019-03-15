import Vue from 'vue'
import router from './router'
import store from './store'
import App from './App.vue'

// 引入flexible
import 'amfe-flexible'

import './styles/index.less'

// 引入vantUI
import Vant from 'vant'
import 'vant/lib/index.css'

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
