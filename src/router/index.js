import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Login'
import Home from '@/views/Home'
import Content from '@/views/Content'
import Images from '@/views/Images'
import Publish from '@/views/Publish'
import Comments from '@/views/Comments'
import Fans from '@/views/Fans'
import Setting from '@/views/Setting'
import Welcome from '@/views/Welcome'
import NotFound from '@/views/404'
Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Home,
      children: [
        { path: '/', component: Welcome },
        { name: 'content', path: '/content', component: Content },
        { name: 'images', path: '/images', component: Images },
        { name: 'publish', path: '/publish', component: Publish },
        { name: 'comments', path: '/comments', component: Comments },
        { name: 'fans', path: '/fans', component: Fans },
        { name: 'setting', path: '/setting', component: Setting },
        { path: '*', component: NotFound }
      ] },
    { name: 'login', path: '/login', component: Login }

  ]
})
// 实例化一个router
// 注册路由对象

export default router
