import request from '@/service'
import { IAccount, ILoginResult, IDataType } from './types'

// 枚举
enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  UserMenu = '/role/'
}

export function accountLoginRequest(account: IAccount) {
  return request.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

export function requestLoginUserInfoById(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false // 不需要加载loading
  })
}

export function requestLoginUserMenuById(id: number) {
  return request.get<IDataType>({
    url: LoginAPI.UserMenu + id + '/menu',
    showLoading: false
  })
}
