import request from '@/service'
import type { IAccount, ILoginResult } from './types'
import type { IDataType } from '../types'

// 枚举
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenu = '/role/'
}
// 登录请求
export function accountLoginRequest(account: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}
// 请求登录用户信息
export function requestLoginUserInfoById(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false // 不需要加载loading
  })
}
// 请求登录用户菜单
export function requestLoginUserMenuById(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.UserMenu + id + '/menu',
    showLoading: false
  })
}
