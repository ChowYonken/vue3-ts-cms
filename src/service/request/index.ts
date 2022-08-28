import axios from 'axios'
import type { AxiosInstance } from 'axios'

import { requestInterceptor, requestConfig } from './type'

import { ElLoading } from 'element-plus'
import 'element-plus/theme-chalk/el-loading.css'
import 'element-plus/theme-chalk/base.css'

const DEAFULT_LOADING = true

class Request {
  instance: AxiosInstance
  interceptors?: requestInterceptor
  loading?: any
  showLoading: boolean
  // 这个config既有AxiosRequestConfig的属性，也有自己封装的属性
  constructor(config: requestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    this.showLoading = config.showLoading ?? DEAFULT_LOADING

    // 将实例传入的拦截器赋值给this.interceptors
    this.interceptors = config.interceptors
    // 创建实例拦截器
    this.instance.interceptors.request.use(
      // this.instance调用拦截器
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.reponseInterceptorCatch
    )
    // 创建所有实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log('所有实例都有的请求拦截器成功请求拦截')

        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在请求数据',
            background: 'rgba(0, 0, 0, 0.5)'
          })
        }
        return config
      },
      (err) => {
        console.log('所有实例都有的拦截器失败请求拦截')
        return err
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        this.loading?.close()
        console.log('所有实例都有的拦截器成功响应拦截')
        return res
      },
      (err) => {
        console.log('所有实例都有的拦截器失败响应拦截')
        return err
      }
    )
  }
  request<T>(config: requestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING
          resolve(res)
        })
        .catch((err) => {
          this.showLoading = DEAFULT_LOADING
          reject(err)
          return err
        })
    })
  }

  get<T>(config: requestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: requestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: requestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: requestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default Request
