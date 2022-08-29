import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'
// import { globalRegister } from './global'
import 'normalize.css'
import './assets/css/index.less'
// 引入iconfont
import './assets/font/iconfont/iconfont.css'

const app = createApp(App)
// 注册element-plus/其他
// app.use(globalRegister)
app.use(router)
app.use(store)
setupStore()
app.mount('#app')
