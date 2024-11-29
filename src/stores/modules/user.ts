// import { store } from '@/stores'
import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
// 登录和用户的请求接口
import AuthAPI, { type LoginData } from '@/api/auth'
import UserAPI, { type UserInfo } from '@/api/system/user'
// token管理工具
import { setToken, setRefreshToken, getRefreshToken, clearToken } from '@/utils/auth'

// store相关的,存储关于user的信息,需要借助之前的一些接口,然后拿到响应,存储起来
export const useUserStore = defineStore('user', () => {
  const userInfo = useStorage<UserInfo>('userInfo', {} as UserInfo)

  // 登录操作,这是首先在登录.vue组件中调用的方法
  function login(loginData: LoginData) {
    return new Promise((resolve, reject) => {
      AuthAPI.login(loginData)
        .then((data) => {
          const { tokenType, accessToken, refreshToken } = data
          setToken(tokenType + ' ' + accessToken) // Bearer eyJhbGciOiJIUzI1NiJ9.xxx.xxx,存储到localStorage中
          setRefreshToken(refreshToken)
          resolve(data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * 获取用户信息,获取的是当前登录的用户信息
   *
   * @returns {UserInfo} 用户信息
   */
  function getUserInfo() {
    return new Promise<UserInfo>((resolve, reject) => {
      UserAPI.getInfo()
        .then((data) => {
          if (!data) {
            reject('Verification failed, please Login again.')
            return
          }
          Object.assign(userInfo.value, data)
          resolve(data) //这里为什么需要resolve(data),上面都没有resolve数据
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  function logout() {
    return new Promise<void>((resolve, reject) => {
      AuthAPI.logout()
        .then(() => {
          clearToken()
          resolve()
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  /**
   * 刷新 token
   */
  function refreshToken() {
    const refreshToken = getRefreshToken()
    return new Promise<void>((resolve, reject) => {
      AuthAPI.refreshToken(refreshToken)
        .then((data) => {
          const { tokenType, accessToken, refreshToken } = data
          setToken(tokenType + ' ' + accessToken)
          setRefreshToken(refreshToken)
          resolve()
        })
        .catch((error) => {
          console.log(' refreshToken  刷新失败', error)
          reject(error)
        })
    })
  }

  function clearUserData() {
    return new Promise<void>((resolve) => {
      console.log('clear user data ')
      resolve()
    })
  }

  return {
    userInfo,
    login,
    getUserInfo,
    logout,
    refreshToken,
    clearUserData,
  }
})

// export function useUserStoreHook() {
//   return useUserStore(store)
// }
