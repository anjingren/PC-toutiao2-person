import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { name: 'home', path: '/', component: Home },
    { name: 'login', path: '/login', component: Login }
  ]
})
// 实例化一个router
// 注册路由对象

export default router
