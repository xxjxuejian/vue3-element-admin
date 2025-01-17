// 注册所有的自定义指令
import type { App } from 'vue'
import { hasPerm } from './permission/index'

export function setupDirective(app: App<Element>) {
  // 使 v-hasPerm 在所有组件中都可用
  app.directive('hasPerm', hasPerm)
}
