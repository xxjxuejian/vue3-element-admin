import type { NavigationGuardNext, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { getToken } from '@/utils/auth'
import NProgress from '@/utils/nprogress'
import router from '@/router'
import { usePermissionStore, useUserStore } from '@/stores'

export function setupPermission() {
  // 白名单路由，什么是白名单
  const whiteList = ['/login', '/404', '/401']

  //
  router.beforeEach(async (to, from, next) => {
    NProgress.start()

    // 获取token，判断有没有登录
    const isLogin = !!getToken()

    // 如果登录了
    if (isLogin) {
      // 如果去的页面是login页面，则跳转到首页（登录以后不让去登陆页面）
      if (to.path === '/login') {
        next({ path: '/test' })
        // router.push({ path: '/' })
      }
      // 如果去的不是登录页，是其它的页面,要先判断路由有没有加载完成
      else {
        const permissionStore = usePermissionStore()
        // 如果路由加载完成，但是没有匹配页面，则跳转到404
        if (permissionStore.isRoutesLoaded) {
          // to：即将要进入的路由对象，是一个路由对象
          if (to.matched.length === 0) {
            // 路由未匹配，跳转到404
            next('/404')
          }
          // 如果路由匹配成功，则放行
          else {
            // 动态设置页面标题
            const title = (to.params.title as string) || (to.query.title as string)
            if (title) {
              to.meta.title = 'hahahah'
            }
            next()
          }
        }
        // 路由没有加载完成，则先加载路由，再跳转
        else {
          // 生成动态路由
          try {
            // 生成动态路由
            // 每次页面刷新是否是之前注册的路由就没了，都要重新注册？？
            const dynamicRoutes = await permissionStore.generateRoutes()
            dynamicRoutes.forEach((route: RouteRecordRaw) => router.addRoute(route))
            console.log('路由对象', router)
            next({ ...to, replace: true })
          } catch (error) {
            console.error(error)
            // 路由加载失败，重置 token 并重定向到登录页
            await useUserStore().clearUserData()
            redirectToLogin(to, next)
            NProgress.done()
          }
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
        redirectToLogin(to, next)
        router.push({ path: '/' })
        NProgress.done()
      }
    }
  })

  // 后置守卫，保证每次路由跳转结束时关闭进度条
  router.afterEach(() => {
    NProgress.done()
  })
}

// 重定向到登录页
function redirectToLogin(to: RouteLocationNormalized, next: NavigationGuardNext) {
  const params = new URLSearchParams(to.query as Record<string, string>)
  const queryString = params.toString()
  const redirect = queryString ? `${to.path}?${queryString}` : to.path
  next(`/login?redirect=${encodeURIComponent(redirect)}`)
}
