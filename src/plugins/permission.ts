import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/auth'
import NProgress from '@/utils/nprogress'
import router from '@/router'
import { usePermissionStore, useUserStore } from '@/stores'

export function setupPermission() {
  // 白名单路由，什么是白名单
  const whiteList = ['/login', '/404', '/401']

  //
  router.beforeEach((to, from, next) => {
    NProgress.start()

    // 获取token，判断有没有登录
    const isLogin = !!getToken()

    // 如果登录了
    if (isLogin) {
      // 如果去的页面是login页面，则跳转到首页（登录以后不让去登陆页面）
      if (to.path === '/login') {
        next({ path: '/' })
      }
      // 如果去的不是登录页，是其它的页面,要先判断路由有没有加载完成
      else {
        const permissionStore = usePermissionStore()
        // 如果路由加载完成，但是没有匹配页面，则跳转到404
        if (permissionStore.isRoutesLoaded) {
        }
      }
    }
    // 如果没有登录，判断是不是白名单路由，是白名单路由，也可以通过
    else {
      if (whiteList.includes(to.path)) {
        next() //放行
      }
      // 重定向到登录页面
      else {
        console.log('未登录，被路由拦截器拦截，重定向到登录页')
        // 不在白名单，重定向到登录页
        // redirectToLogin(to, next)
        NProgress.done()
      }
    }
  })

  // 后置守卫，保证每次路由跳转结束时关闭进度条
  router.afterEach(() => {
    NProgress.done()
  })
}
