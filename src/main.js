import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
// 引入element-ui
import ElementUI from 'element-ui'
import '../node_modules/element-ui/lib/theme-chalk/index.css'
import axios from '@/api/axios.js'
// 在全局注册使用
// 引入全局less
import '@/styles/index.less'

// 引入全局组件
import components from '@/components'
// 注册
Vue.use(components)
// 为了避免在每个页面在使用axios都要引入的情况，我们把axios挂载到Vue实例的原型对象上
Vue.prototype.axios = axios
Vue.use(ElementUI)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
