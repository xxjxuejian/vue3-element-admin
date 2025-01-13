// src/main.ts
// main.ts
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/dark/css-vars.css'
import '@/styles/index.scss'
import 'virtual:uno.css'
import 'animate.css'
import 'virtual:svg-icons-register' //iconfont图标配置

import { createApp } from 'vue'
import App from './App.vue'
import setupPlugins from '@/plugins'

const app = createApp(App)

/*
 插件是一个对象,app.use(obj)时，obj对象有一个install方法，会自动执行这个方法，在这个方法里面可以注册全局

*/
// 注册插件
app.use(setupPlugins)
app.mount('#app')
