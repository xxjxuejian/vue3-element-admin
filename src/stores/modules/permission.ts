import type { RouteRecordRaw } from 'vue-router'
import { defineStore } from 'pinia'
import { ref } from 'vue'
import { constantRoutes } from '@/router'
import { store } from '@/stores'

import MenuAPI, { type RouteVO } from '@/api/system/menu'
const modules = import.meta.glob('../../views/**/**.vue')
console.log('modules', modules)

const Layout = () => import('@/layout/index.vue')

// 这里的目的就是根据登录用户的路由信息结合之前的静态路由，生成一个完整的路由，
// 所谓完整的路由，就类似直接在router把全部路由写死的那种形式，
// 但是现在是要结合用户信息生成 一个完整路由，这就是动态路由注册

// 这个项目中，后端返回的路由信息，已经是按照vue-router形式的数组了，基本就是router的component字段用文字代替，而不是组件
// 所以这种是比较简单的,我们直接把整个对象的component字段替换为 xxx.vue就行了
export const usePermissionStore = defineStore('permission', () => {
  // 所有路由，包括静态和动态路由
  const routes = ref<RouteRecordRaw[]>([])

  // 路由是否已加载
  const isRoutesLoaded = ref(false)

  /**
   * 生成动态路由
   */
  function generateRoutes() {
    MenuAPI.getRoutes().then((data: any) => {
      console.log('data', data)
      const dynamicRoutes = transformRoutes(data)
      console.log('dynamicRoutes', dynamicRoutes)
      // 把静态路由和动态路由合并
      // routes.value = constantRoutes.concat(dynamicRoutes)
      // isRoutesLoaded.value = true
    })
  }

  return {
    routes,
    isRoutesLoaded,
    generateRoutes,
  }
})

//
function transformRoutes(routes: RouteVO[]) {
  const asyncRoutes: RouteRecordRaw[] = []

  routes.forEach((route) => {
    const tmpRoute = { ...route } as RouteRecordRaw

    if (route.component?.toString() === 'Layout') {
      tmpRoute.component = Layout
    } else {
      // tmpRoute.component = () => import(`@/views/${route.component}.vue`)
      // 拿到对应的组件: () => import("/src/views/demo/api/apifox.vue")
      const component = modules[`../../views/${tmpRoute.component}.vue`]

      // 有可能后端返回了这个路由,但是前端没写这个组件,那么就拿不到component,拿不到就默认匹配404组件
      if (component) {
        tmpRoute.component = component
      } else {
        tmpRoute.component = modules['../../views/error/404.vue']
      }
    }

    if (tmpRoute.children) {
      tmpRoute.children = transformRoutes(route.children)
    }
    asyncRoutes.push(tmpRoute)
  })

  return asyncRoutes
}

export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
