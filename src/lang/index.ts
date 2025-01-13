// 本地语言包
import enLocale from './package/en'
import zhCnLocale from './package/zh-cn'

import type { App } from 'vue'
import { createI18n } from 'vue-i18n'
import { useAppStoreHook, useAppStore } from '@/stores/modules/app'
// import { store } from '@/stores'
/*
这个文件是
*/

// const appStore = useAppStore(store)
const appStore = useAppStoreHook()
const messages = {
  'zh-cn': {
    ...zhCnLocale,
  },
  en: {
    ...enLocale,
  },
}
const i18n = createI18n({
  legacy: false,
  //@ts-ignore
  locale: appStore.language,
  messages: messages,
  globalInjection: true,
})

console.log('i18n注册了外部，想在这里使用const appStore = useAppStore()')
// 全局注册 i18n,这是给main.ts文件中注册用的
export function setupI18n(app: App<Element>) {
  app.use(i18n)
  console.log('i18n注册了内部', i18n)
}
console.log('i18n注册了外部', i18n)
export default i18n
