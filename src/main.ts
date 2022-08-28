import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from './service'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'

const app = createApp(App)
// 注册element-plus/其他
app.use(globalRegister)
app.use(router)
app.use(store)
app.mount('#app')

// request.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独的响应response')
//       return res
//     }
//   }
// })

interface DataType {
  data: any
  returnCode: string
  success: boolean
}

request
  .request<DataType>({
    url: '/home/multidata',
    method: 'GET'
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
