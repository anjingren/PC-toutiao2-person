import axios from 'axios'
import JSONBig from 'json-bigint'
var instance = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/mp/v1_0/',
  //   headers: { Authorization: 'Bearer ' + JSON.parse(window.sessionStorage.getItem('toutiao2')) }
  // 利用transformResponse在返回前对数据进行处理
  transformResponse: [function (data) {
  // 对 data 进行任意转换处理
  // 同时进行严格的数据判断，有的事件并没有返回数据
    if (data) {
      return JSONBig.parse(data)
    }
    return data
  }]
})

// 不能在全局的axios中配置请求头，原因是因为，如果载没有登录之前，我们发送axios请求，那么，token就是null，会一直报错，无法进行正常登录
// 我们要在此进行判断，是否是进行登录的请求，如果是登录的请求之后，我们才能进行获取token，设置请求头
// 用axios的请求拦截  在请求或响应被 then 或 catch 处理前拦截它们
instance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 在发送请求之前做的,在请求前进行判断，是否有哦user，没有user，我们就回到登录页面
  var user = window.sessionStorage.getItem('toutiao2')
  // console.log(user)
  // 判断是否有user，如果有，就正常发送请求，如果没有就回到登录界面
  if (user) {
    config.headers = { Authorization: 'Bearer ' + JSON.parse(user).token }
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// token的时效是2小时，如果token失效，发送axios请求时会返回401的状态码，所以，我们就要再次进行登录，获取token
instance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  // 对于响应回来的状态码进行判断
  console.log(error)
  // if (error.response.status === 401) {
  //   // 如果等于401，重新登录
  //   location.hash = '#/login'
  // }
  return Promise.reject(error)
})

export default instance
