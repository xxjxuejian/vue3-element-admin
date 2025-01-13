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
    redirect: '/login',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
        meta: { title: 'dashboard', icon: 'homepage', affix: true, keepAlive: true },
      },
      {
        path: '401',
        component: () => import('@/views/error/401.vue'),
        meta: { hidden: true },
      },
      {
        path: '404',
        component: () => import('@/views/error/404.vue'),
        meta: { hidden: true },
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

/*
全局注册 router,就是
createApp(App).use(router).mount('#app')
只不过把他封装成了一个函数，然后暴露出去，可以直接调用
*/
export function setupRouter(app: App<Element>) {
  app.use(router)
}
export default router
