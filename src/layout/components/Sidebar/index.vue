<script setup>
import { computed } from 'vue'
import SidebarLogo from './components/SidebarLogo.vue'
import SidebarMenu from './components/SidebarMenu.vue'

import { usePermissionStore, useAppStore } from '@/stores'
const permissionStore = usePermissionStore()
const appStore = useAppStore()

const isSidebarCollapsed = computed(() => !appStore.sidebar.opened)

// 递归处理路由,解决path不正确问题.// routes是一个数组
function recurRoutes(routes, parentPath = '') {
  for (let i = 0; i < routes.length; i++) {
    let cur = routes[i]
    let path = cur.path

    if (path === '/') {
      cur.meta = { ...cur.meta, title: '首页' }
    }
    if (cur.children && cur.children.length > 0) {
      // 检查route是否需要递归
      recurRoutes(cur.children, path)
    }

    // 如果当前的路由中含有父级路径,要把父级路径剔除掉
    if (parentPath !== '' && path.startsWith(parentPath)) {
      cur.path = path.replace(new RegExp(`^${parentPath}/?`), '')
    }
  }
}
recurRoutes(permissionStore.routes)
console.log('index,menu-list', permissionStore.routes)
</script>

<template>
  <div>
    <SidebarLogo :collapse="isSidebarCollapsed" />
    <el-scrollbar>
      <SidebarMenu :menu-list="permissionStore.routes" base-path="" />
    </el-scrollbar>
  </div>
</template>

<style scoped></style>
