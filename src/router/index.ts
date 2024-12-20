import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'
import type { App } from 'vue'

export const Layout = () => import('@/layout/index.vue')

// 静态的路由，直接配置
export const constantRoutes: RouteRecordRaw[] = [
  {
    path: '/login',
    component: () => import('@/views/login/index.vue'),
    meta: { hidden: true }, //这个hidden是什么？
  },
  {
    path: '/redirect',
    component: Layout,
    meta: { hidden: true },
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index.vue'),
      },
    ],
  },

  // 进入到/路径时，会首先渲染layout组件，再渲染dashboard组件
  {
    path: '/',
    name: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'dashboard', icon: 'homepage', affix: true, keepAlive: true },
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes,
  scrollBehavior: () => ({ left: 0, top: 0 }),
})
// console.log('router', router.install)

// 全局注册 router,什么意思？作为插件注册
export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
