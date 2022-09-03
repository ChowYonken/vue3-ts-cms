import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
// 引入iconfont
import './assets/font/iconfont/iconfont.css'
// 统一导入 element 图标
import * as Icons from '@element-plus/icons'

const app = createApp(App)
// 注册一些全局的函数
app.use(globalRegister)

// 注册全局 element-icons 组件
Object.keys(Icons).forEach((key) => {
  app.component(key, Icons[key as keyof typeof Icons])
})
app.use(store)
setupStore()
app.use(router)
app.mount('#app')
