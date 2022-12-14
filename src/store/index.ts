import { createStore, Store, useStore as useVuexStore } from 'vuex'
import type { IRootState } from './types'
import type { IStoreType } from './types'
import login from './login/login'
import system from './main/system/system'
import product from './main/product/product'
import analysis from './main/analysis/dashboard'
import { getPageListData } from '@/service/main/system/system'

const store = createStore<IRootState>({
  state() {
    return {
      counter: 100,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    // 获取一些初始化数据
    async getInitialDataAction({ commit }) {
      // 1.请求部门
      const departmentResult = await getPageListData('department/list', {
        offset: 0,
        size: 1000
      })
      // 给解构里的属性起别名
      const { list: departmentList } = departmentResult.data
      // 请求角色数据
      const roleResult = await getPageListData('role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      // 请求菜单数据
      const menuResult = await getPageListData('menu/list', {
        offset: 0,
        size: 100
      })
      const { list: menuList } = menuResult.data

      // 2.保存数据到state
      commit('changeEntireDepartment', departmentList)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  modules: {
    login,
    system,
    product,
    analysis
  }
})

// 当用户刷新页面，vuex的数据就会被清空
// 编写一个函数重新刷新会自动再次获取vuex数据
export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 封装userStore 给他加上类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}

export default store
