import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 引入element-ui
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
// 在全局注册使用
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
