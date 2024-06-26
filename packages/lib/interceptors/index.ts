
import * as resultInterceptor from './resultInterceptor'
import * as loadingInterceptor from './loadingInterceptor'
import * as cacheInterceptor from './cacheInterceptor'
import * as loginInterceptor from './loginInterceptor'
import { ConfigType } from '../type'
import { ERROR_MESSAGE, HTTP_SUCCESS_CODE } from '../constant'
import instance from '..'
import { errorLog } from '../util'

let hasInit = false
export const initInterceptors = (axios:any) => {
  // 缓存拦截器
  if(!hasInit){
    axios.interceptors.response.use(cacheInterceptor.onResponseFulfilled, cacheInterceptor.onResponseRejected)
    // loading拦截器
    axios.interceptors.request.use(loadingInterceptor.onRequestFulfilled, loadingInterceptor.onRequestRejected)
    axios.interceptors.response.use(loadingInterceptor.onResponseFulfilled, loadingInterceptor.onResponseRejected)
    // 登陆拦截器
    axios.interceptors.response.use(loginInterceptor.onFulfilled, loginInterceptor.onRejected)
    // 响应拦截器
    axios.interceptors.response.use(resultInterceptor.onFulfilled, resultInterceptor.onRejected)
  }
  hasInit=true

}




export const transferResult = (res: any, config: ConfigType) => {
  if (config?.ignoreTransferResult) {
    return res
  }

  if (res?.code === HTTP_SUCCESS_CODE) {
    return res.data || res
  }
  if (config?.errorHandler) {
    config.errorHandler(res)
  } else {
    const message = instance.get('message')
    message && message.error(res?.msg || ERROR_MESSAGE)
    errorLog(res)
  }
  return Promise.reject(res)
}


