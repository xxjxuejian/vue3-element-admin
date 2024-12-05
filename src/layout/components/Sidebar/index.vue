<script setup>
import SidebarLogo from './components/SidebarLogo.vue'
import SidebarMenu from './components/SidebarMenu.vue'

import { usePermissionStore } from '@/stores'
const permissionStore = usePermissionStore()
console.log(permissionStore.routes)

// 菜单处理,/function内部有一个路由的path有问题，这里可以写成递归，更加通用
permissionStore.routes.forEach((item) => {
  if (item.path === '/function') {
    item.children.forEach((item) => {
      if (item.path.startsWith('/function')) {
        console.log(item)
        item.path = item.path.replace('/function/', '')
        console.log(item)
      }
    })
  }
})
// console.log('index,menu-list', permissionStore.routes)
</script>

<template>
  <div>
    <SidebarLogo />
    <el-scrollbar>
      <SidebarMenu :menu-list="permissionStore.routes" base-path="" />
    </el-scrollbar>
  </div>
</template>

<style scoped></style>
