import Request from './request'
import { BASE_URL, TIME_OUT } from './request/config'
import localCache from '@/utils/cache'

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
      // 携带token拦截
      const token = localCache.getCache('token')
      config.headers!.Authorization = token
      return config
    },
    requestInterceptorCatch: (err) => {
      return err
    },
    responseInterceptor: (res) => {
      return res
    },
    reponseInterceptorCatch: (err) => {
      return err
    }
  }
})
export default request
