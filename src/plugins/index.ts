// 插件的集中注册点，负责初始化多个功能模块

import type { App } from 'vue'

/*
这些全部都是处于模块加载阶段，模块内部的顶层代码会被执行，但是内部定义的函数都不会立即执行
在这些导入代码中，都还没有创建pinia实例，即没有执行app.use(pinia)， pinia 还没有安装
所以内部想到使用store的代码，比如const appStore = useAppStore()  等代码都不能正常执行
那么在这些文件中，如果确实需要使用store，怎么办？
*/
import { setupDirective } from '@/directive'
import { setupStore } from '@/stores'
import { setupI18n } from '@/lang'
import { setupRouter } from '@/router'
import { setupElIcons } from './icons'
import { setupPermission } from './permission'
// import webSocketManager from "@/utils/websocket";
// import { InstallCodeMirror } from "codemirror-editor-vue3";

export default {
  install(app: App<Element>) {
    // 自定义指令(directive)
    setupDirective(app)
    // 路由(router) ,静态路由
    setupRouter(app)
    // 状态管理(store)
    setupStore(app)
    // 国际化
    setupI18n(app)
    // Element-plus图标
    setupElIcons(app)
    // 路由守卫 ，设置路由拦截器
    setupPermission()
    // 初始化 WebSocket
    // webSocketManager.setupWebSocket();
    // 注册 CodeMirror
    // app.use(InstallCodeMirror);
  },
}
