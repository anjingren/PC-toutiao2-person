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
    { name: 'login', path: '/login', component: Login },
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
      ] }

  ]
})
// 实例化一个router
// 注册路由对象

export default router

router.beforeEach((to, from, next) => {
  // 获取本地session中的token
  // 路由切换的时候，如果不是login组件，并且，也灭有token，那么就回到登录页面
  var user = window.sessionStorage.getItem('toutiao2')
  // console.log(to.path)
  if (to.path !== '/login' && !user) {
    return next('/login')
  } else {
    // 除了设置不是login的路由，以及没有user的情况，我们必须要在进行判断之后，进行 next()设置，如果没有next，那么就会
    // 一直无法向下执行
    return next()
  }
})
