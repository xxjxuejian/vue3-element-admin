// 用户登录的一些方法,借助于网络请求,进一步调用这些接口

import request from '@/utils/request'

const AUTH_BASE_URL = '/api/v1/auth'

const AuthAPI = {
  /** 登录接口  data参数来自于 登录表单的输入 */
  login(data: LoginData) {
    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('password', data.password)
    formData.append('captchaKey', data.captchaKey)
    formData.append('captchaCode', data.captchaCode)

    // 发送网络请求
    return request<any, LoginResult>({
      url: AUTH_BASE_URL + '/login',
      method: 'post', // 请求方式
      data: formData, // 请求体参数
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },

  /** 访问token过期，重新获取，参数是刷新token*/
  refreshToken(refreshToken: string) {
    return request<any, LoginResult>({
      url: `${AUTH_BASE_URL}/refresh-token`,
      method: 'post',
      data: { refreshToken: refreshToken },
      headers: {
        Authorization: 'no-auth',
      },
    })
  },

  /** 注销接口*/
  logout() {
    return request({
      url: AUTH_BASE_URL + '/logout',
      method: 'delete',
    })
  },

  /** 获取验证码接口*/
  getCaptcha() {
    return request<any, CaptchaResult>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: 'get',
    })
  },
}

/** 登录请求参数 */
export interface LoginData {
  /** 用户名 */
  username: string
  /** 密码 */
  password: string
  /** 验证码缓存key */
  captchaKey: string
  /** 验证码 */
  captchaCode: string
}

/** 登录响应 */
export interface LoginResult {
  /** 访问令牌 */
  accessToken: string
  /** 刷新令牌 */
  refreshToken: string
  /** 令牌类型 */
  tokenType: string
  /** 过期时间(秒) */
  expiresIn: number
}

/** 验证码响应 */
export interface CaptchaResult {
  /** 验证码缓存key */
  captchaKey: string
  /** 验证码图片Base64字符串 */
  captchaBase64: string
}

export default AuthAPI
