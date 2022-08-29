import { createStore } from 'vuex'
import { IRootState } from './types'
import login from './login/login'

const store = createStore<IRootState>({
  state() {
    return {
      counter: 100
    }
  },
  actions: {},
  modules: {
    login
  }
})

// 当用户刷新页面，vuex的数据就会被清空
// 编写一个函数重新刷新会自动再次获取vuex数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

export default store
