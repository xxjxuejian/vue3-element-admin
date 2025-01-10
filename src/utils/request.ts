import axios, { type InternalAxiosRequestConfig, type AxiosResponse } from 'axios'
import qs from 'qs'
import { ElNotification } from 'element-plus'
import { useUserStore } from '@/stores/modules/user' //用户信息的store
import { getToken } from '@/utils/auth'
import { ResultEnum } from '@/enums/ResultEnum'
import router from '@/router'

// 创建 axios 实例 ,针对网络请求的封装
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' },
  paramsSerializer: (params) => qs.stringify(params),
})

// 请求拦截器,如果有token，就添加
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = getToken() //获取访问token
    // 如果 Authorization 不是 no-auth，同时token存在，则携带 Token
    if (config.headers.Authorization !== 'no-auth' && accessToken) {
      config.headers.Authorization = accessToken
    }
    // 如果 Authorization 设置为 no-auth，则不携带 Token，用于登录、刷新 Token 等接口，此时accessToken也不存在，可以一起处理
    else {
      delete config.headers.Authorization
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // 如果响应是二进制流，则直接返回，用于下载文件、Excel 导出等
    // 这种类型不能return response.data
    if (response.config.responseType === 'blob') {
      return response
    }
    // json数据,成功状态
    const { code, data, msg } = response.data
    if (code === ResultEnum.SUCCESS) {
      return data
    }

    // @ts-ignore
    ElMessage.error(msg || '系统出错')
    return Promise.reject(new Error(msg || 'Error'))
  },
  // 响应错误拦截器，处理不同的错误状态
  (error: any) => {
    // 非 2xx 状态码处理 401、403、500 等
    const { config, response } = error
    if (response) {
      const { code, msg } = response.data

      // 访问令牌无效或过期，重新获取一次，但是可能刷新令牌也过期
      if (code === ResultEnum.ACCESS_TOKEN_INVALID) {
        console.log('token过期，重新获取')
        return handleTokenRefresh(config)
        // return 'AccessTokenInvalid'
      }
      // 刷新令牌无效或过期,应该是跳转登录页面
      else if (code === ResultEnum.REFRESH_TOKEN_INVALID) {
        return Promise.reject(new Error(msg || 'Error'))
      } else {
        // @ts-ignore
        ElMessage.error(msg || '系统出错')
      }
    }
    return Promise.reject(error.message)
  },
)

// 导出 axios 实例
export default service

// 刷新 Token 的锁,表示是否正在刷新token
let isRefreshing = false
// 因 Token 过期导致失败的请求队列
let requestsQueue: Array<() => void> = []

// 刷新 Token 处理, config是失败以后后端返回的config，之前请求时的config , 所以后端那里需要把这个config返回,需要后端支持
async function handleTokenRefresh(config: InternalAxiosRequestConfig) {
  // 如果token过期了，又同时发送了好几个请求，这些请求都会返回code=ACCESS_TOKEN_INVALID,进入到该函数中，
  // 但是进入也是有先后的，这个函数是用来重新获取accessToken，只要第一个失败的请求，进入到函数里以后，就可以重新获取accessToken了
  // 后面的失败请求，因为前面已经在重新获取了，isRefreshing = true, 那么if (!isRefreshing) 代码就不会执行

  // 目的就是如果获取到了新的accessToken,就把之前失败的请求，重新发送一次
  // 那我首先就要知道之前的失败的是哪些请求
  return new Promise((resolve) => {
    // 这是函数定义,不是执行
    const requestCallback = () => {
      config.headers.Authorization = getToken()
      // service(config)是用Axios 实例来发起请求，这个实例已经有了一些预设配置，config是这个失败的请求的配置，
      // 这样相当于再次发送了一个同样的请求
      // 但是这里知识函数的定义，并没有实际再次请求一次
      resolve(service(config))
    }
    requestsQueue.push(requestCallback)

    if (!isRefreshing) {
      isRefreshing = true

      // 刷新 Token
      useUserStore()
        .refreshToken()
        .then(() => {
          // Token 刷新成功，执行请求队列
          requestsQueue.forEach((callback) => callback())
          requestsQueue = []
        })
        .catch((error: any) => {
          console.log('handleTokenRefresh error', error)
          // Token 刷新失败，清除用户数据并跳转到登录
          ElNotification({
            title: '提示',
            message: '您的会话已过期，请重新登录',
            type: 'info',
          })
          useUserStore()
            .clearUserData()
            .then(() => {
              router.push('/login')
            })
        })
        .finally(() => {
          isRefreshing = false
        })
    }
  })
}
