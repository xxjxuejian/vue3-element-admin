import { createPinia } from 'pinia'
import type { App } from 'vue'
const store = createPinia()

export * from './modules/app'
export * from './modules/permission'
export * from './modules/settings'
// export * from './modules/tags-view'
export * from './modules/user'
// export * from './modules/dict'
export { store }

// 全局注册 store
console.log('setupStore外部')

/*
  只有在app.use(pinia)以后，才能去使用那些store,但是现在 app.use(store)封装在一个函数中，模块在加载时不会立即执行，
  此时pinia还没有被初始化，
*/
export function setupStore(app: App<Element>) {
  app.use(store)
  console.log('setupStore内部：app.use(store)')
}
console.log('store注册了外部', store)
