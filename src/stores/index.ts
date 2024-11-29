import { createPinia } from 'pinia'
import type { App } from 'vue'
const store = createPinia()

// export * from './modules/app'
export * from './modules/permission'
// export * from './modules/settings'
// export * from './modules/tags-view'
export * from './modules/user'
// export * from './modules/dict'
export { store }

// 全局注册 store
export function setupStore(app: App<Element>) {
  app.use(store)
}
