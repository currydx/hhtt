//main.js
//配置vue
import Vue from 'vue'
import App from './App.vue'
import './styles/base.less'
import './styles/iconfont.css'

//自动适配所有屏幕
import 'lib-flexible'

//引入路由
import router from './router'

//引入头部组件
import HmHeader from './components/HmHeader.vue'
Vue.component('hm-header', HmHeader)

//引入logo组件
import HmLogo from './components/HmLogo.vue'
Vue.component('hm-logo', HmLogo)

//引入按钮组件
import HmButton from './components/HmButton.vue'
Vue.component('hm-button', HmButton)

//引入post组件
import HmPost from './components/HmPost.vue'
Vue.component('hm-post', HmPost)

//导入vant输入框组件
import { Field } from 'vant';
Vue.use(Field);
import { Toast } from 'vant';
Vue.use(Toast);
import { Cell, CellGroup } from 'vant';
Vue.use(Cell)
Vue.use(CellGroup)
import { Dialog } from 'vant';
Vue.use(Dialog)
import { RadioGroup, Radio } from 'vant';
Vue.use(Radio);
Vue.use(RadioGroup);
import { Uploader } from 'vant';
Vue.use(Uploader);
import { List } from 'vant';
Vue.use(List);

//过滤器
import moment from 'moment'
Vue.filter('time', (val, format = "YYYY-MM-DD") => {
  return moment(val).format(format)
})

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.prototype.$axios = axios

//请求拦截器
axios.interceptors.request.use(config => {
  let token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})
//响应拦截器
axios.interceptors.response.use(res => {
  //判断
  const { message, statusCode } = res.data
  if (statusCode === 401 && message === "用户信息验证失败") {
    //删除token
    localStorage.removeItem('token')
    localStorage.removeItem('user_id')
    //返回首页
    router.push('/login')
  }
  return res
})

//构建vue实例
new Vue({
  router,
  render: (h) => h(App)
}).$mount("#app")