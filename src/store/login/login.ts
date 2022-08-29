import { Module } from 'vuex'
import router from '@/router'
import { IRootState } from '../types'
import { ILoginState } from './types'
import {
  accountLoginRequest,
  requestLoginUserInfoById,
  requestLoginUserMenuById
} from '@/service/login/login'
import { IAccount } from '@/service/login/types'
import localCache from '@/utils/cache'

const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: [],
      userMenus: []
    }
  },
  mutations: {
    // 将token保存到state中
    changeToken(state, token: string) {
      state.token = token
    },
    // 保存登录用户信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    // 保存登录用户菜单
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    async accountLoginAction({ commit }, payload: IAccount) {
      // 1.实现登录 获取token
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      // 将token保存到本地
      localCache.setCache('token', token)

      // 2.请求登录用户信息
      const userInfoResult = await requestLoginUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo)

      // 3.请求登录用户的菜单
      const userMenuResult = await requestLoginUserMenuById(id)
      const userMenus = userMenuResult.data
      commit('changeUserMenus', userMenus)
      localCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    // 当刷新页面  再次从localStorage里获取数据保存到vuex中
    loadLocalLogin({ commit }) {
      const token = localCache.getCache('token')
      if (token) {
        commit('changeToken', token)
      }
      const userInfo = localCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = localCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    }
  }
}

export default loginModule
