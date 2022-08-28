import { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface requestInterceptor<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (eror: any) => any
  responseInterceptor?: (res: T) => T
  reponseInterceptorCatch?: (error: any) => any
}

// requestConfig继承AxiosRequestConfig 既有自己的inteceptors属性 也有AxiosRequestConfig的属性
export interface requestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: requestInterceptor<T>
  showLoading?: boolean
}
